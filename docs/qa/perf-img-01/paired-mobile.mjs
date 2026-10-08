import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const after = process.env.PERF_ORIGIN;
const before = JSON.parse(fs.readFileSync('docs/qa/perf-img-01/baseline-preview/deployment.json')).url;
const browser = await chromium.launch({ channel: 'chrome', proxy: process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin } : undefined });
const report = { browser: browser.version(), status: 'RUNNING', method: 'Three alternating cold-browser trials per origin and route; 390×844 DPR 3; 150ms, 200000 B/s down, 93750 B/s up; no CPU throttle; no scrolling or input during LCP.', samples: [] };
try {
for (let round = 1; round <= 3; round++) for (const route of ['/', '/kiwi']) for (const [label, origin] of round === 2 ? [['after', after], ['baseline', before]] : [['baseline', before], ['after', after]]) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const auth = await context.request.get(origin + '/', { maxRedirects: 0, maxRetries: 2, headers: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' } }).catch(error => { throw Error('Preview cookie authentication transport failed: ' + error.message.split('Call log:')[0].trim()); });
  assert([200, 307].includes(auth.status()));
  await context.addInitScript(() => { window.__pairedLCP = null; new PerformanceObserver(list => { for (const e of list.getEntries()) window.__pairedLCP = { time: e.startTime, url: e.url, element: e.element?.tagName }; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
  const page = await context.newPage(); const cdp = await context.newCDPSession(page); const images = new Map(); const networkStatuses = new Map();
  await cdp.send('Network.enable'); await cdp.send('Network.clearBrowserCache');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750, connectionType: 'cellular4g' });
  cdp.on('Network.responseReceived', e => { if (e.type === 'Image') images.set(e.requestId, { url: e.response.url, cache: Object.fromEntries(Object.entries(e.response.headers).filter(([k]) => /^(age|x-vercel-cache|x-nextjs-cache)$/i.test(k))) }); });
  cdp.on('Network.loadingFinished', e => { if (images.has(e.requestId)) images.get(e.requestId).bytes = e.encodedDataLength; });
  cdp.on('Network.responseReceivedExtraInfo', e => networkStatuses.set(e.requestId, e.statusCode));
  const response = await page.goto(origin + route, { waitUntil: 'networkidle', timeout: 90000 }); assert.equal(response.status(), 200); assert.equal(new URL(page.url()).origin, origin); await page.waitForTimeout(750);
  const lcp = await page.evaluate(() => window.__pairedLCP); assert(lcp?.time);
  const sample = { round, label, origin, route, lcp, imageRequests: images.size, imageBytes: [...images.values()].reduce((n, i) => n + (i.bytes || 0), 0), images: [...images.values()] };
  report.samples.push(sample); console.log(JSON.stringify({ round, label, route, lcpMs: lcp.time, bytes: sample.imageBytes }));
  if (round === 1 && route === '/kiwi' && label === 'after') {
    images.clear(); networkStatuses.clear();
    await page.goto(origin + route, { waitUntil: 'networkidle', timeout: 90000 });
    report.warmCacheAudit = [...images.entries()].map(([id, i]) => ({ url: i.url, wireBytes: i.bytes, networkStatus: networkStatuses.get(id) }));
  }
  await context.close();
}
report.status = 'PASS';
} finally { fs.writeFileSync('docs/qa/perf-img-01/paired-mobile.json', JSON.stringify(report, null, 2) + '\n'); await browser.close(); }
