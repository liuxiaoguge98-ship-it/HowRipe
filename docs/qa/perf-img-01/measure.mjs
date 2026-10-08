import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.resolve('next'))('sharp');
const origin = process.env.PERF_ORIGIN || 'http://localhost:3102';
const out = process.env.PERF_OUTPUT || 'docs/qa/perf-img-01/baseline-local';
const remote = origin.startsWith('https:');
const proxyUrl = remote && process.env.HTTPS_PROXY ? new URL(process.env.HTTPS_PROXY) : null;
const browser = await chromium.launch({ channel: 'chrome', headless: true, proxy: proxyUrl ? { server: proxyUrl.origin } : undefined });
const routes = (process.env.PERF_ROUTES || '/,/avocado,/kiwi,/pomegranate,/persimmon').split(',');
const profiles = process.env.PERF_MOBILE_ONLY === '1' ? ['slow4g'] : ['slow4g', 'desktop'];
const report = { origin, profile: { name: 'Controlled Slow 4G equivalent', latencyMs: 150, downloadBytesPerSecond: 200000, uploadBytesPerSecond: 93750, mobileDPR: 3, cpuThrottling: false }, measurements: [], errors: [] };
fs.mkdirSync(out, { recursive: true });
const sum = rows => rows.reduce((n, r) => n + (r.transferBytes || 0), 0);
try {
for (const profile of profiles) for (const route of routes) {
  const mobile = profile === 'slow4g';
  const context = await browser.newContext({ viewport: { width: mobile ? 390 : 1440, height: mobile ? 844 : 1000 }, deviceScaleFactor: mobile ? 3 : 1, isMobile: mobile, hasTouch: mobile });
  // Cookie authentication keeps the HTTP cache functional; request routing would disable it.
  if (remote && process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    const auth = await context.request.get(origin + '/', { maxRedirects: 0, headers: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' } }).catch(() => { throw Error('Preview cookie authentication transport failed'); });
    if (![200, 307].includes(auth.status())) throw Error('Preview cookie authentication failed');
  }
  await context.addInitScript(() => {
    window.__imagePerf = { lcp: null, cls: 0, appearances: [] };
    new PerformanceObserver(list => { for (const e of list.getEntries()) window.__imagePerf.lcp = { time: e.startTime, size: e.size, url: e.url || e.element?.currentSrc || '', element: e.element?.tagName, text: e.element?.textContent?.slice(0, 100) }; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__imagePerf.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    document.addEventListener('load', e => { if (e.target.tagName === 'IMG') window.__imagePerf.appearances.push({ url: e.target.currentSrc, time: performance.now() }); }, true);
  });
  const page = await context.newPage(); const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable'); await cdp.send('Network.clearBrowserCache');
  if (mobile) await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750, connectionType: 'cellular4g' });
  const requests = new Map(); let bodies = []; let navTime = 0;
  cdp.on('Network.requestWillBeSent', e => requests.set(e.requestId, { url: e.request.url, type: e.type, startMs: (e.timestamp - navTime) * 1000, initialPriority: e.request.initialPriority }));
  cdp.on('Network.requestServedFromCache', e => { const r = requests.get(e.requestId); if (r) r.memoryCache = true; });
  cdp.on('Network.responseReceived', e => {
    const r = requests.get(e.requestId); if (!r) return;
    Object.assign(r, { type: e.type, status: e.response.status, mime: e.response.mimeType, diskCache: e.response.fromDiskCache, headers: Object.fromEntries(Object.entries(e.response.headers).filter(([k]) => /^(cache-control|content-type|age|x-vercel-cache|x-nextjs-cache|etag)$/i.test(k))) });
  });
  cdp.on('Network.loadingFinished', e => {
    const r = requests.get(e.requestId); if (!r) return;
    r.transferBytes = e.encodedDataLength; r.endMs = (e.timestamp - navTime) * 1000;
    if (r.type === 'Image') bodies.push(cdp.send('Network.getResponseBody', { requestId: e.requestId }).then(async b => {
      const buffer = Buffer.from(b.body, b.base64Encoded ? 'base64' : 'utf8'); const m = await sharp(buffer).metadata();
      Object.assign(r, { bodyBytes: buffer.length, downloadedWidth: m.width, downloadedHeight: m.height, format: m.format });
    }).catch(() => {}));
  });
  page.on('pageerror', e => report.errors.push({ route, profile, error: String(e) }));
  for (const cache of ['cold', 'warm']) {
    requests.clear(); bodies = [];
    navTime = (await cdp.send('Performance.getMetrics').catch(() => ({ metrics: [] }))).metrics.find(m => m.name === 'Timestamp')?.value || 0;
    // Network request timestamps and navigationStart share the CDP monotonic clock.
    await cdp.send('Performance.enable');
    navTime = (await cdp.send('Performance.getMetrics')).metrics.find(m => m.name === 'Timestamp').value;
    const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
    if (response.status() !== 200) throw Error(`${route}: ${response.status()}`);
    if (cache === 'cold') await page.screenshot({ path: path.join(out, `${route.slice(1) || 'home'}-${profile}-early.png`) });
    await page.waitForLoadState('networkidle', { timeout: 90000 });
    await page.waitForTimeout(750);
    await Promise.all(bodies);
    const initial = await page.evaluate(() => {
      const height = innerHeight;
      return { ...window.__imagePerf, width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
        preloadCount: document.querySelectorAll('link[rel="preload"][as="image"]').length,
        images: [...document.images].map(i => {
          const r = i.getBoundingClientRect();
          return { src: i.getAttribute('src'), currentSrc: i.currentSrc, sizes: i.sizes, loading: i.loading, fetchPriority: i.fetchPriority, alt: i.alt,
            width: r.width, height: r.height, cssWidth: parseFloat(getComputedStyle(i).width), cssHeight: parseFloat(getComputedStyle(i).height), transform: getComputedStyle(i).transform, objectFit: getComputedStyle(i).objectFit, padding: getComputedStyle(i).padding, top: r.top, bottom: r.bottom,
            complete: i.complete && i.naturalWidth > 0, visible: i.checkVisibility(), aboveFold: i.checkVisibility() && r.top < height && r.bottom > 0,
            role: i.closest('#quiz') ? 'E Quiz/current interaction' : i.closest('[data-editorial-section="related"]') ? 'F related navigation' : r.top < height && r.bottom > 0 ? 'B above fold' : r.top < height + 500 ? 'C near fold' : 'D below fold' };
        }) };
    });
    const startup = [...requests.values()].filter(r => r.type === 'Image');
    const aboveUrls = new Set(initial.images.filter(i => i.aboveFold).map(i => i.currentSrc));
    for (const i of initial.images) if (i.currentSrc === initial.lcp?.url && i.aboveFold) i.role = 'A actual LCP';
    const record = { route, profile, cache, ...initial, initialImageRequests: startup.length, initialNetworkImageRequests: startup.filter(r => r.transferBytes > 0 && !r.diskCache && !r.memoryCache).length,
      initialImageBytes: sum(startup), aboveFoldImageBytes: sum(startup.filter(r => aboveUrls.has(r.url))), initialRequests: structuredClone(startup) };
    if (cache === 'cold') {
      await page.screenshot({ path: path.join(out, `${route.slice(1) || 'home'}-${profile}-settled.png`) });
      // Normal progressive scrolling: 600px per 600ms, waiting for visible evidence.
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 600)); } });
      await page.waitForLoadState('networkidle', { timeout: 90000 }); await Promise.all(bodies);
      const total = [...requests.values()].filter(r => r.type === 'Image');
      Object.assign(record, { fullScrollImageRequests: total.length, fullScrollImageBytes: sum(total), allRequests: structuredClone(total), clsAfterScroll: await page.evaluate(() => window.__imagePerf.cls) });
      if (route !== '/') {
        const quiz = page.locator('#quiz'); await quiz.scrollIntoViewIfNeeded();
        const states = []; const questionAssets = [];
        for (let q = 0; q < 5; q++) {
          // Leave the previous option's hover state before the next transition.
          await page.mouse.move(0, 0);
          await page.waitForTimeout(750);
          await page.waitForFunction(() => [...document.querySelectorAll('#quiz img')].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 90000 });
          questionAssets.push(await quiz.locator('img').evaluateAll(images => images.map(i => ({ src: i.currentSrc, sizes: i.sizes, width: i.getBoundingClientRect().width }))));
          await page.getByRole('button', { name: q % 2 ? 'Choose B' : 'Choose A', exact: true }).click(); states.push(await quiz.getAttribute('data-game-state'));
          await page.getByRole('button', { name: /^Got it/ }).click();
          await page.waitForFunction(() => ['ANSWERING', 'COMPLETED'].includes(document.querySelector('#quiz').getAttribute('data-game-state')));
        }
        record.quiz = { states, completed: await quiz.getAttribute('data-game-state') === 'COMPLETED', questionAssets };
        await page.getByRole('button', { name: 'Restart', exact: true }).click();
      }
    }
    report.measurements.push(record);
    fs.writeFileSync(path.join(out, 'measurements.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ route, profile, cache, requests: record.initialImageRequests, bytes: record.initialImageBytes, aboveBytes: record.aboveFoldImageBytes, lcp: record.lcp, cls: record.cls }));
  }
  await context.close();
}
// Header audit runs outside all timed navigation windows.
const cacheContext = await browser.newContext();
if (remote && process.env.VERCEL_AUTOMATION_BYPASS_SECRET) await cacheContext.request.get(origin + '/', { maxRedirects: 0, headers: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' } }).catch(() => { throw Error('Preview cookie authentication transport failed'); });
report.cacheAudit = [];
for (const url of ['/fruits/kiwi/hero/hero.webp', '/_next/image?url=%2Ffruits%2Fkiwi%2Fhero%2Fhero.webp&w=640&q=75']) {
  const response = await cacheContext.request.get(origin + url, { headers: { Accept: 'image/webp' } });
  report.cacheAudit.push({ path: url, status: response.status(), headers: Object.fromEntries(Object.entries(response.headers()).filter(([k]) => /^(cache-control|content-type|age|x-vercel-cache|x-nextjs-cache|etag)$/i.test(k))) });
}
await cacheContext.close();
report.status = 'PASS';
} catch (error) { report.status = 'FAIL'; report.failure = String(error); throw error; }
finally { fs.writeFileSync(path.join(out, 'measurements.json'), JSON.stringify(report, null, 2) + '\n'); await browser.close(); }
