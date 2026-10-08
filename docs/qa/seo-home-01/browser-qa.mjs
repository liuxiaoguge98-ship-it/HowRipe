import { chromium } from 'playwright';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const origin = process.env.QA_ORIGIN || 'http://localhost:3102';
const out = process.env.QA_OUTPUT || 'docs/qa/seo-home-01/pass-1';
const remote = process.env.QA_PREVIEW === '1';
const proxyUrl = remote && process.env.HTTPS_PROXY ? new URL(process.env.HTTPS_PROXY) : null;
const proxy = proxyUrl ? { server: proxyUrl.origin, username: decodeURIComponent(proxyUrl.username), password: decodeURIComponent(proxyUrl.password) } : undefined;
const browser = await chromium.launch({ channel: 'chrome', headless: true, proxy });
const context = await browser.newContext();
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
if (bypass) await context.route(url => url.origin === new URL(origin).origin, route => route.continue({ headers: { ...route.request().headers(), 'x-vercel-protection-bypass': bypass } }));
const page = await context.newPage();
fs.mkdirSync(out, { recursive: true });
const report = { origin, status: 'RUNNING', home: [], fruit: [], errors: [] };
page.on('pageerror', error => report.errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
const entries = [
  ['/avocado', 'How to tell if an avocado is ripe'], ['/kiwi', 'How to tell if a kiwi is ripe'],
  ['/pomegranate', 'How to choose a ripe pomegranate'], ['/persimmon', 'How to tell if a persimmon is ripe'],
];
const count = text => (text.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g) || []).length;
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
async function visit(route, width) {
  await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
  const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  const raw = new JSDOM(await response.text()).window.document;
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 35)); }
  });
  await page.waitForFunction(() => [...document.images].every(i => !i.checkVisibility() || (i.complete && i.naturalWidth > 0)));
  await page.evaluate(() => window.scrollTo(0, 0));
  const common = await page.evaluate(() => ({
    width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight, h1Count: document.querySelectorAll('h1').length,
    title: document.title, canonical: document.querySelector('link[rel="canonical"]').href,
    englishOnly: document.documentElement.lang === 'en' && !/\p{Script=Han}/u.test(document.body.innerText) && ![...document.querySelectorAll('[lang]')].some(e => !e.lang.startsWith('en')),
    headerBrand: document.querySelector('header a').textContent, footerBrand: document.querySelector('footer a').textContent,
    missingImages: [...document.images].filter(i => i.checkVisibility() && (!i.complete || !i.naturalWidth)).length,
    oldBrand: /fruit picking guide|fruit-picking-guide/i.test(document.body.innerText),
    ogSiteName: document.querySelector('meta[property="og:site_name"]').content,
  }));
  assert.equal(common.scrollWidth, width, `${route}: overflow at ${width}`);
  assert.equal(common.h1Count, 1); assert.equal(common.englishOnly, true); assert.equal(common.oldBrand, false);
  assert.equal(common.headerBrand, 'HowRipe'); assert.equal(common.footerBrand, 'HowRipe'); assert.equal(common.ogSiteName, 'HowRipe'); assert.equal(common.missingImages, 0);
  assert.equal(common.canonical, 'https://www.howripe.com' + route);
  const metadata = [...raw.querySelectorAll('meta[content],link[rel="canonical"]')].map(e => e.getAttribute('content') || e.getAttribute('href')).join(' ');
  assert(!/localhost|vercel\.app/.test(metadata));
  return { common, raw };
}
try {
  for (const width of remote ? [1440, 390] : [1440, 1024, 768, 390, 360]) {
    const { common, raw } = await visit('/', width);
    assert.equal(raw.title, 'HowRipe — How to Tell If Fruit Is Ripe');
    assert.equal(raw.querySelector('meta[property="og:title"]').content, raw.title);
    assert.equal(raw.querySelector('meta[name="twitter:title"]').content, raw.title);
    assert.equal(raw.querySelectorAll('h1').length, 1);
    assert(raw.querySelector('#ripeness-principles'));
    assert(!raw.querySelector('main').textContent.includes('Explore guide'));
    for (const [href, label] of entries) {
      const anchor = raw.querySelector(`#fruit-guides article a[href="${href}"]`);
      assert(anchor?.querySelector('h3')); assert.equal(anchor.querySelector('a'), null);
      assert(raw.getElementById(anchor.getAttribute('aria-labelledby')).textContent.includes(label));
      assert.equal(await page.getByRole('link', { name: label, exact: true }).count(), 1);
      assert(raw.querySelector(`#ripeness-principles a[href="${href}"]`));
    }
    const home = await page.evaluate(() => {
      function textOf(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const parts = []; let node;
        while (node = walker.nextNode()) {
          const p = node.parentElement;
          if (p.checkVisibility() && !p.closest('nav,[aria-hidden="true"],a[href^="#"]') && !/^\s*\d+\s*$/.test(node.textContent)) parts.push(node.textContent);
        }
        return parts.join(' ').replace(/\s+/g, ' ').trim();
      }
      const headings = [...document.querySelectorAll('main h1,main h2,main h3')].map(e => ({ level: Number(e.tagName.slice(1)), text: e.innerText.replace(/\s+/g, ' ') }));
      return { meaningfulText: textOf(document.querySelector('main')), editorialText: textOf(document.querySelector('#ripeness-principles')),
        headings, headingSkips: headings.filter((h, i) => i && h.level > headings[i - 1].level + 1),
        description: document.querySelector('meta[name="description"]').content,
        contextualLinks: [...document.querySelectorAll('#ripeness-principles a')].map(a => ({ href: a.getAttribute('href'), text: a.innerText })),
        conceptColumns: getComputedStyle(document.querySelector('[class*="concepts"]')).gridTemplateColumns,
      };
    });
    assert.equal(home.headingSkips.length, 0);
    assert.equal(home.headings[0].text, 'Pick better fruit.');
    if (width < 640) assert.equal(home.conceptColumns.split(' ').length, 1);
    const screenshots = {};
    if ([1440, 390].includes(width)) {
      await page.screenshot({ path: path.join(out, `home-${width}.png`), fullPage: true });
      for (const [name, selector] of [['hero', 'main section:first-child'], ['footer', 'footer'], ['fruit-index', '#fruit-guides'], ['editorial', '#ripeness-principles']]) {
        const file = path.join(out, `${name}-${width}.png`); await page.locator(selector).screenshot({ path: file });
        const baseline = `docs/qa/seo-home-01/baseline/${name}-${width}.png`;
        if (fs.existsSync(baseline)) screenshots[name] = { baseline: 'development render', byteIdentical: hash(file) === hash(baseline) };
      }
      await page.locator('#ripeness-principles').scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(out, `editorial-viewport-${width}.png`) });
      await page.evaluate(() => window.scrollTo(0, document.querySelector('#ripeness-principles').getBoundingClientRect().top + window.scrollY - 240));
      await page.screenshot({ path: path.join(out, `index-transition-${width}.png`) });
      await page.goto(origin, { waitUntil: 'networkidle' });
      await page.getByRole('link', { name: entries[0][1], exact: true }).click(); await page.waitForURL('**/avocado');
      await page.locator('header a').first().click(); await page.waitForURL(origin + '/');
      assert.equal(new URL(page.url()).pathname, '/');
    }
    report.home.push({ ...common, ...home, meaningfulWords: count(home.meaningfulText), editorialWords: count(home.editorialText), screenshots, rawHtmlCrawlable: true, navigation: [1440, 390].includes(width) ? 'click-tested' : 'static hrefs verified' });
    console.log(`PASS home ${width}: ${count(home.meaningfulText)} words / ${count(home.editorialText)} editorial, crawlable links, no overflow`);
  }
  for (const width of [1440, 390]) for (const [route] of entries) {
    const { common } = await visit(route, width);
    const quiz = page.locator('#quiz'); await quiz.scrollIntoViewIfNeeded(); assert.equal(await quiz.getAttribute('data-game-state'), 'ANSWERING');
    const firmness = page.getByRole('button', { name: /Check firmness/ });
    if (await firmness.count()) { await firmness.first().click(); assert.equal(await quiz.getAttribute('data-game-state'), 'ANSWERING'); }
    await page.getByRole('button', { name: 'Choose A', exact: true }).click();
    assert(['CORRECT_FEEDBACK', 'WRONG_FEEDBACK'].includes(await quiz.getAttribute('data-game-state')));
    await page.getByRole('button', { name: /^Got it/ }).click();
    await page.waitForFunction(() => document.querySelector('#quiz').getAttribute('data-game-state') === 'ANSWERING');
    report.fruit.push({ ...common, route, quizInitialized: true, answerAndGotIt: true });
    console.log(`PASS ${route} ${width}: unchanged guide, quiz smoke, images, English and canonical`);
  }
  report.crawl = {};
  for (const route of ['/robots.txt', '/sitemap.xml']) {
    const response = await page.request.get(origin + route, { headers: bypass ? { 'x-vercel-protection-bypass': bypass } : {} });
    assert.equal(response.status(), 200); const body = await response.text(); report.crawl[route] = { status: response.status(), body };
    if (route === '/robots.txt') { assert(body.includes('Allow: /')); assert(body.includes('Sitemap: https://www.howripe.com/sitemap.xml')); }
    else assert.deepEqual([...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]).sort(), ['https://www.howripe.com/', ...entries.map(([r]) => 'https://www.howripe.com' + r)].sort());
  }
  assert.deepEqual(report.errors, []); report.status = 'PASS';
} catch (error) { report.status = 'FAIL'; report.failure = String(error); throw error; }
finally { fs.writeFileSync(path.join(out, 'browser.json'), JSON.stringify(report, null, 2) + '\n'); await browser.close(); }
