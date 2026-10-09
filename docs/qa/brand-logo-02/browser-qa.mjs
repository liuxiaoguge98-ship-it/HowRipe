import { chromium } from 'playwright';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const origin = process.env.QA_ORIGIN || 'http://localhost:3108';
const out = process.env.QA_OUTPUT || 'docs/qa/brand-logo-02/local';
const remote = process.env.QA_PREVIEW === '1';
const proxy = remote && process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin } : undefined;
const browser = await chromium.launch({ channel: 'chrome', headless: true, proxy });
const context = await browser.newContext({ deviceScaleFactor: 1 });
await context.addInitScript(() => {
  window.__brandCLS = 0;
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__brandCLS += entry.value;
  }).observe({ type: 'layout-shift', buffered: true });
});
const report = { origin, browser: browser.version(), status: 'RUNNING', pages: [], assets: [], errors: [] };
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
fs.mkdirSync(out, { recursive: true });

try {
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    // Cookie authentication keeps the actual browser cache/network behavior intact.
    const auth = await context.request.get(origin + '/', {
      maxRedirects: 0, maxRetries: 2,
      headers: {
        'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
        'x-vercel-set-bypass-cookie': 'true',
      },
    }).catch(() => { throw new Error('Preview cookie authentication transport failed'); });
    assert([200, 307].includes(auth.status()), 'Preview cookie authentication failed');
  }
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });

  for (const route of ['/', '/avocado']) for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    const raw = new JSDOM(await response.text()).window.document;
    assert.equal(raw.querySelector('link[rel="canonical"]').href, 'https://www.howripe.com' + route);
    assert.equal(raw.querySelector('meta[property="og:site_name"]').content, 'HowRipe');
    assert(raw.querySelector('link[rel="icon"][href="/favicon.svg"][sizes="any"]'));
    assert(raw.querySelector('link[rel="icon"][href="/icon-192.png"][sizes="192x192"]'));
    assert.equal(raw.querySelectorAll('link[rel="icon"][href^="/favicon.ico"]').length, 1);
    assert.equal(raw.querySelector('link[rel="apple-touch-icon"]').getAttribute('href'), '/apple-touch-icon.png');
    assert.equal(raw.querySelector('link[rel="manifest"]').getAttribute('href'), '/manifest.webmanifest');
    assert.equal(raw.querySelectorAll('link[rel="preload"][as="image"]').length, 1, 'Only the critical hero should be preloaded');
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 35));
      }
    });
    await page.waitForFunction(() => [...document.images].every(image => !image.checkVisibility() || (image.complete && image.naturalWidth > 0)));
    const state = await page.evaluate(() => ({
      width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
      english: document.documentElement.lang === 'en' && !/\p{Script=Han}/u.test(document.body.innerText),
      h1Count: document.querySelectorAll('h1').length,
      cls: window.__brandCLS,
      headerHeight: document.querySelector('header').getBoundingClientRect().height,
      brand: [...document.querySelectorAll('header .site-wordmark, footer .site-wordmark')].map(link => {
        const image = link.querySelector('img'); const bounds = image.getBoundingClientRect();
        return { text: link.textContent, label: link.getAttribute('aria-label'), href: link.getAttribute('href'),
          src: image.getAttribute('src'), alt: image.alt, hidden: image.getAttribute('aria-hidden'),
          decoded: image.complete && image.naturalWidth > 0, width: bounds.width, height: bounds.height };
      }),
      brokenImages: [...document.images].filter(image => image.checkVisibility() && (!image.complete || !image.naturalWidth)).length,
      highPriorityImages: document.querySelectorAll('img[fetchpriority="high"]').length,
    }));
    assert.equal(state.width, width); assert.equal(state.scrollWidth, width);
    assert.equal(state.english, true); assert.equal(state.h1Count, 1); assert.equal(state.brokenImages, 0);
    assert.equal(state.highPriorityImages, 1, 'Brand mark must not compete with the hero image');
    assert.equal(state.brand.length, 2);
    assert.equal(state.cls, 0, 'Brand load must not cause layout shift');
    assert.equal(state.headerHeight, width === 390 ? 69 : 77, 'Existing header height is preserved');
    for (const mark of state.brand) {
      assert.deepEqual(mark, { text: 'HowRipe', label: 'HowRipe home', href: '/', src: '/brand/howripe-mark.svg', alt: '', hidden: 'true', decoded: true, width: width === 390 ? 28 : 30, height: width === 390 ? 28 : 30 });
    }
    const slug = route === '/' ? 'home' : 'avocado';
    for (const selector of ['header', 'footer']) {
      await page.locator(selector).screenshot({ path: path.join(out, `${slug}-${width}-${selector}.png`) });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(out, `${slug}-${width}.png`) });

    if (route === '/') {
      await page.getByRole('link', { name: 'How to tell if an avocado is ripe', exact: true }).click();
      await page.waitForURL('**/avocado');
      await page.locator('header').getByRole('link', { name: 'HowRipe home', exact: true }).click();
      await page.waitForURL(origin + '/');
    } else {
      const quiz = page.locator('#quiz');
      await quiz.scrollIntoViewIfNeeded();
      assert.equal(await quiz.getAttribute('data-game-state'), 'ANSWERING');
      const firmness = page.getByRole('button', { name: /Check firmness/ });
      if (await firmness.count()) await firmness.first().click();
      await page.getByRole('button', { name: 'Choose A', exact: true }).click();
      assert(['CORRECT_FEEDBACK', 'WRONG_FEEDBACK'].includes(await quiz.getAttribute('data-game-state')));
      await page.getByRole('button', { name: /^Got it/ }).click();
      await page.waitForFunction(() => document.querySelector('#quiz').getAttribute('data-game-state') === 'ANSWERING');
      await page.locator('footer').getByRole('link', { name: 'HowRipe home', exact: true }).click();
      await page.waitForURL(origin + '/');
    }
    report.pages.push({ route, ...state, imagePreloadCount: 1, rawHtmlMetadata: 'PASS', navigation: 'PASS', quiz: route === '/avocado' ? 'answer, feedback, Got it: PASS' : 'not applicable' });
    console.log(`PASS ${route} ${width}: brand, icons, images, navigation${route === '/avocado' ? ', Quiz' : ''}`);
  }

  for (const file of [
    '/brand/howripe-mark.svg', '/brand/howripe-logo.svg', '/brand/howripe-mark-reverse.svg', '/brand/howripe-logo-reverse.svg',
    '/favicon.svg', '/favicon.ico', '/favicon-16x16.png', '/favicon-32x32.png', '/apple-touch-icon.png', '/icon-192.png', '/icon-512.png',
  ]) {
    const response = await context.request.get(origin + file);
    assert.equal(response.status(), 200, file);
    const body = await response.body();
    assert.equal(hash(body), hash(fs.readFileSync('public' + file)), `${file}: deployed bytes differ`);
    const contentType = response.headers()['content-type'];
    assert(contentType.includes(file.endsWith('.svg') ? 'image/svg+xml' : file.endsWith('.png') ? 'image/png' : 'image/'), file);
    if (!file.endsWith('.ico')) {
      assert(await page.evaluate(async url => {
        const image = new Image(); image.src = url;
        await image.decode(); return image.naturalWidth > 0 && image.naturalHeight > 0;
      }, origin + file), file);
    }
    report.assets.push({ file, status: response.status(), contentType, bytes: body.length, sha256: hash(body), browserDecode: file.endsWith('.ico') ? 'ICO frames verified in unit test' : 'PASS' });
  }
  const manifestResponse = await context.request.get(origin + '/manifest.webmanifest');
  assert.equal(manifestResponse.status(), 200);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.name, 'HowRipe'); assert.equal(manifest.lang, 'en');
  assert.deepEqual(manifest.icons.map(icon => icon.src), ['/icon-192.png', '/icon-512.png']);
  report.manifest = manifest;
  const { manifest: chromiumManifest, errors } = await (await context.newCDPSession(page)).send('Page.getAppManifest');
  assert.equal(errors.length, 0); assert(chromiumManifest.icons.length === 2);
  report.chromiumManifestErrors = errors;
  const robots = await context.request.get(origin + '/robots.txt');
  const sitemap = await context.request.get(origin + '/sitemap.xml');
  assert.equal(robots.status(), 200); assert.equal(sitemap.status(), 200);
  assert((await robots.text()).includes('Allow: /'));
  assert.deepEqual([...((await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g))].map(match => match[1]).sort(),
    ['/', '/avocado', '/kiwi', '/pomegranate', '/persimmon'].map(route => 'https://www.howripe.com' + route).sort());
  report.crawl = 'Existing robots and five canonical sitemap URLs: PASS';
  assert.deepEqual(report.errors, []);
  await import('./favicon-qa.mjs');
  report.tabIcon = 'Isolated Chrome cache: 16/32px decoded pixels equal exported brand icons';
  report.status = 'PASS';
} catch (error) {
  report.status = 'FAIL'; report.failure = String(error); throw error;
} finally {
  fs.writeFileSync(path.join(out, 'browser.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
