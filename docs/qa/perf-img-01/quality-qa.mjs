import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const origin = process.env.PERF_ORIGIN || 'http://localhost:3102';
const out = process.env.PERF_OUTPUT || 'docs/qa/perf-img-01/quality-local';
const baseline = JSON.parse(fs.readFileSync('docs/qa/perf-img-01/baseline-preview/measurements.json'));
const proxy = origin.startsWith('https:') && process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin } : undefined;
const browser = await chromium.launch({ channel: 'chrome', proxy });
const report = { origin, status: 'RUNNING', comparison: 'Same unchanged layout; baseline delivery candidate restored for image-quality comparison only.', cases: [] };
fs.mkdirSync(out, { recursive: true });
try {
for (const mobile of [true, false]) for (const route of ['/avocado', '/kiwi', '/pomegranate', '/persimmon']) {
  const profile = mobile ? 'slow4g' : 'desktop'; const width = mobile ? 390 : 1440;
  const context = await browser.newContext({ viewport: { width, height: mobile ? 844 : 1000 }, deviceScaleFactor: mobile ? 3 : 1 });
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) await context.request.get(origin + '/', { maxRedirects: 0, headers: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' } }).catch(() => { throw Error('Preview cookie authentication transport failed'); });
  const page = await context.newPage(); await page.goto(origin + route, { waitUntil: 'networkidle' });
  const cases = route === '/avocado' ? [['hand', '.teaching-figure[data-treatment="pressure"]'], ['stem', '.condition-guide'], ['surface', '.teaching-comparison[data-detail="surface"]']]
    : route === '/kiwi' ? [['hand', '.teaching-figure[data-treatment="photo"]'], ['whole', '.teaching-comparison[data-detail="whole"]'], ['quiz-scenario', '#quiz']]
    : route === '/pomegranate' ? [['hand', '.teaching-figure[data-treatment="photo"]'], ['surface', '.teaching-comparison[data-detail="surface"]']]
    : [['whole', '.teaching-comparison[data-detail="whole"]']];
  const before = baseline.measurements.find(r => r.route === route && r.profile === profile && r.cache === 'cold');
  for (const [name, selector] of cases) {
    if (name === 'quiz-scenario') {
      await page.locator('#quiz').scrollIntoViewIfNeeded();
      for (let i = 0; i < 2; i++) { await page.getByRole('button', { name: 'Choose A', exact: true }).click(); await page.getByRole('button', { name: /^Got it/ }).click(); await page.waitForFunction(() => document.querySelector('#quiz').getAttribute('data-game-state') === 'ANSWERING'); }
    }
    const node = page.locator(selector).first();
    await node.scrollIntoViewIfNeeded();
    if (name === 'surface') await node.locator('summary').click();
    await page.waitForFunction(selector => [...document.querySelector(selector).querySelectorAll('img')].filter(i => i.checkVisibility()).every(i => i.complete && i.naturalWidth > 0), selector);
    await page.waitForTimeout(750);
    const afterBox = await node.boundingBox();
    const images = await node.locator('img').evaluateAll(is => is.map(i => ({ src: i.currentSrc, visible: i.checkVisibility(), width: i.getBoundingClientRect().width, height: i.getBoundingClientRect().height })));
    const stem = `${route.slice(1)}-${name}-${width}`;
    await node.screenshot({ path: path.join(out, `${stem}-after.png`) });
    const candidates = [...before.allRequests.map(r => r.url), ...before.quiz.questionAssets.flat().map(i => i.src)];
    const original = new Map();
    for (const candidate of candidates) {
      const u = new URL(candidate); const src = u.searchParams.get('url'); const size = Number(u.searchParams.get('w'));
      if (size > (original.get(src) || 0)) original.set(src, size);
    }
    const replacements = Object.fromEntries(images.filter(i => i.src).map(i => {
      const u = new URL(i.src); const source = u.searchParams.get('url'); const size = original.get(source); assert(size, source);
      return [source, `${origin}/_next/image?url=${encodeURIComponent(source)}&w=${size}&q=75`];
    }));
    await node.locator('img').evaluateAll((is, replacements) => { for (const i of is) { const src = new URL(i.currentSrc).searchParams.get('url'); i.removeAttribute('srcset'); i.removeAttribute('sizes'); i.src = replacements[src]; } }, replacements);
    await page.waitForFunction(selector => [...document.querySelector(selector).querySelectorAll('img')].filter(i => i.checkVisibility()).every(i => i.complete && i.naturalWidth > 0), selector);
    await node.screenshot({ path: path.join(out, `${stem}-baseline-variant.png`) });
    const oldBox = await node.boundingBox();
    assert(Math.abs(oldBox.height - afterBox.height) < 0.1); assert(Math.abs(oldBox.width - afterBox.width) < 0.1);
    report.cases.push({ route, width, name, images, baselineCandidates: replacements, geometryUnchanged: true });
  }
  await context.close();
}
report.status = 'PASS';
} finally { fs.writeFileSync(path.join(out, 'quality.json'), JSON.stringify(report, null, 2) + '\n'); await browser.close(); }
