import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { fruitAssets } from '../../../src/lib/fruit-assets.ts';

const sharp = createRequire(import.meta.resolve('next'))('sharp');
const origin = process.env.QA_ORIGIN || 'http://localhost:3108';
const out = process.env.QA_OUTPUT || 'docs/qa/image-background-fix/local';
const proxy = process.env.QA_PREVIEW === '1' && process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin } : undefined;
const browser = await chromium.launch({ channel: 'chrome', headless: true, proxy });
const context = await browser.newContext({ deviceScaleFactor: 1 });
await context.addInitScript(() => {
  const start = document.startViewTransition?.bind(document);
  if (start) document.startViewTransition = (...args) => {
    const transition = start(...args);
    window.__imageQATransition = transition.finished.catch(() => {});
    return transition;
  };
});
const report = { origin, status: 'RUNNING', pages: [], images: [], errors: [] };
const sources = new Map();
fs.mkdirSync(out, { recursive: true });

async function auditImages(page, route, width, state) {
  const images = await page.evaluate(() => [...document.images].filter(image => image.checkVisibility()).map(image => {
    const url = new URL(image.currentSrc || image.src, location.href);
    const blends = []; let parent = image;
    while (parent) {
      const style = getComputedStyle(parent);
      if (style.mixBlendMode !== 'normal') blends.push(style.mixBlendMode);
      parent = parent.parentElement;
    }
    return { src: url.searchParams.get('url') || url.pathname, blends, decoded: image.complete && image.naturalWidth > 0,
      section: image.closest('section')?.getAttribute('data-editorial-section') || image.closest('section')?.id || 'home/brand' };
  }));
  for (const image of images) {
    assert(image.decoded, `Undecoded ${image.src}`);
    if (!image.src.startsWith('/fruits/')) continue;
    if (!sources.has(image.src)) {
      const { data } = await sharp('public' + image.src).resize(16, 16, { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const corners = [0, 15, 240, 255].map(i => [...data.subarray(i * 4, i * 4 + 4)]);
      const scene = Object.values(fruitAssets).some(asset => asset.src === image.src && asset.sourceBackground === 'scene');
      sources.set(image.src, { opaqueWhiteCorners: corners.every(c => c[3] > 250 && c.slice(0, 3).every(v => v > 240)), scene });
    }
    report.images.push({ route, width, state, ...image, ...sources.get(image.src) });
  }
}

try {
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    const auth = await context.request.get(origin + '/', { maxRedirects: 0, maxRetries: 2,
      headers: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' },
    }).catch(() => { throw new Error('Preview authentication transport failed'); });
    assert([200, 307].includes(auth.status()));
  }
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  for (const route of ['/', '/avocado', '/kiwi', '/pomegranate', '/persimmon']) for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 25));
      }
    });
    await page.waitForFunction(() => [...document.images].every(i => !i.checkVisibility() || (i.complete && i.naturalWidth > 0)));
    await auditImages(page, route, width, 'page');
    const slug = route.slice(1) || 'home';
    const related = page.locator('[data-editorial-section="related"]');
    if (await related.count()) {
      await related.screenshot({ path: path.join(out, `${slug}-${width}-related.png`) });
      const card = related.locator('a[href="/persimmon"] .related-visual');
      if (await card.count()) {
        const { data, info } = await sharp(await card.screenshot()).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        const pixel = (x, y) => [...data.subarray((y * info.width + x) * 4, (y * info.width + x) * 4 + 3)];
        report.pages.push({ route, width, persimmonTopBackground: pixel(Math.floor(info.width / 2), 4), cardBackground: pixel(2, 4) });
      }
    } else await page.screenshot({ path: path.join(out, `home-${width}.png`) });
    if (route !== '/') {
      for (let q = 0; q < 5; q++) {
        const quiz = page.locator('#quiz');
        assert.equal(await quiz.getAttribute('data-game-state'), 'ANSWERING');
        await quiz.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => [...document.querySelectorAll('#quiz img')].every(i => i.complete && i.naturalWidth > 0));
        await auditImages(page, route, width, `quiz-${q + 1}`);
        if (q === 2) await quiz.screenshot({ path: path.join(out, `${slug}-${width}-quiz-3.png`) });
        await page.getByRole('button', { name: 'Choose A', exact: true }).click();
        await page.getByRole('button', { name: /^Got it/ }).click();
        await page.waitForFunction(() => ['ANSWERING', 'COMPLETED'].includes(document.querySelector('#quiz').getAttribute('data-game-state')));
        await page.evaluate(async () => { await window.__imageQATransition; });
      }
      assert.equal(await page.locator('#quiz').getAttribute('data-game-state'), 'COMPLETED');
      await related.locator('a').first().click();
      await page.waitForURL(url => url.pathname !== route);
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth === innerWidth));
    console.log(`Checked ${route} ${width}: all page images${route === '/' ? '' : ', five Quiz questions and related navigation'}`);
  }
  report.unblendedWhiteSpecimens = report.images.filter(image => image.opaqueWhiteCorners && !image.scene && !image.blends.includes('multiply'));
  const mismatch = report.pages.filter(p => p.persimmonTopBackground.some((value, i) => Math.abs(value - p.cardBackground[i]) > 3));
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.unblendedWhiteSpecimens, [], 'White specimen art needs its existing background-blending treatment');
  assert.deepEqual(mismatch, [], 'Persimmon white canvas must match its card background');
  report.status = 'PASS';
} catch (error) {
  report.status = 'FAIL'; report.failure = String(error); throw error;
} finally {
  fs.writeFileSync(path.join(out, 'browser.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
