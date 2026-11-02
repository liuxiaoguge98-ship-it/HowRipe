import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.env.QA_ORIGIN || 'http://localhost:3110';
const mode = process.env.QA_GA_MODE || 'off';
const out = process.env.QA_OUTPUT;
assert(out, 'Set QA_OUTPUT to a report directory outside the Git checkout');
assert(['off', 'fixture'].includes(mode));
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext();
const report = { origin, mode, status: 'RUNNING', provider: 'intercepted; no real Analytics data sent', pages: [], errors: [] };
let loaderRequests = 0;
try {
  // Keep fixture IDs and synthetic checks out of any real Analytics stream.
  await context.route('https://www.googletagmanager.com/**', async route => {
    assert.equal(mode, 'fixture', 'Disabled deployments must not load Google Analytics');
    assert.equal(route.request().url(), 'https://www.googletagmanager.com/gtag/js?id=G-HRTEST0001');
    loaderRequests++;
    await route.fulfill({ contentType: 'application/javascript', body: 'window.__ga4FixtureLoaded = true;' });
  });
  await context.route(/https:\/\/[^/]*google-analytics\.com\//, route => route.abort());
  for (const width of [1440, 390]) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    page.on('pageerror', error => report.errors.push(String(error)));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    const before = loaderRequests;
    const response = await page.goto(origin + '/', { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    const documentMarker = await page.evaluate(() => window.__qaDocument = String(Math.random()));
    for (const pathname of ['/', '/avocado', '/']) {
      if (pathname === '/avocado') {
        await page.getByRole('link', { name: 'How to tell if an avocado is ripe', exact: true }).click();
      } else if (await page.evaluate(() => location.pathname) !== '/') {
        await page.locator('header').getByRole('link', { name: 'HowRipe home', exact: true }).click();
      }
      await page.waitForURL(origin + pathname);
      await page.waitForLoadState('networkidle');
      const state = await page.evaluate(() => ({
        pathname: location.pathname, documentMarker: window.__qaDocument,
        scrollWidth: document.documentElement.scrollWidth, width: innerWidth,
        canonical: document.querySelector('link[rel="canonical"]').href,
        brandLinks: [...document.querySelectorAll('header .site-wordmark, footer .site-wordmark')].map(a => a.textContent),
        english: document.documentElement.lang === 'en' && !/\p{Script=Han}/u.test(document.body.innerText),
        loaderScripts: document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').length,
        calls: (window.dataLayer || []).map(args => Array.from(args)),
      }));
      assert.equal(state.pathname, pathname); assert.equal(state.documentMarker, documentMarker, 'Expected real client-side navigation');
      assert.equal(state.scrollWidth, width); assert.equal(state.english, true);
      assert.equal(state.canonical, 'https://www.howripe.com' + pathname);
      assert.deepEqual(state.brandLinks, ['HowRipe', 'HowRipe']);
      assert.equal(state.loaderScripts, mode === 'fixture' ? 1 : 0);
      assert.deepEqual(state.calls.map(call => call[0]), mode === 'fixture' ? ['js', 'config'] : []);
      if (mode === 'fixture') assert.equal(state.calls[1][1], 'G-HRTEST0001');
      report.pages.push({ ...state, width });
    }
    const quizPage = await page.goto(origin + '/avocado', { waitUntil: 'networkidle' });
    assert.equal(quizPage.status(), 200);
    await page.getByRole('button', { name: 'Choose A', exact: true }).click();
    assert(['CORRECT_FEEDBACK', 'WRONG_FEEDBACK'].includes(await page.locator('#quiz').getAttribute('data-game-state')));
    assert.equal(loaderRequests - before, mode === 'fixture' ? 2 : 0, 'One tag load per document; no reload during client navigation');
    await page.screenshot({ path: path.join(out, `avocado-${width}.png`) });
    await page.close();
    console.log(`PASS ${mode} ${width}: production gating, one initialization, client navigation, brand, canonical and Quiz`);
  }
  assert.deepEqual(report.errors, []);
  report.status = 'PASS'; report.loaderRequests = loaderRequests;
  report.realDataCollection = 'PENDING actual Measurement ID and live stream verification';
} catch (error) {
  report.status = 'FAIL'; report.failure = String(error); throw error;
} finally {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'browser.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
