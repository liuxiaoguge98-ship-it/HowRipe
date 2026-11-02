import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium, request } from 'playwright';

const origin = process.env.QA_ORIGIN || 'http://localhost:3110';
const id = process.env.QA_GA_ID;
const out = process.env.QA_OUTPUT;
const captureOnly = process.env.QA_CAPTURE_ONLY !== '0';
assert(id && out, 'Set QA_GA_ID and QA_OUTPUT');
fs.mkdirSync(out, { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin, bypass: 'localhost,127.0.0.1' } : undefined;
const local = new URL(origin).hostname === 'localhost' || new URL(origin).hostname === '127.0.0.1';
const transport = await request.newContext({ proxy });
const browser = await chromium.launch({ channel: 'chrome', headless: true, proxy: local ? undefined : proxy });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const report = { origin, id, captureOnly, status: 'RUNNING', events: [], errors: [] };
let scriptLoads = 0;
try {
  // The host's browser proxy cannot reach loopback. Keep local application
  // traffic direct and fetch Google's public SDK through a separate transport.
  if (local) await context.route('https://www.googletagmanager.com/**', async route => {
    const response = await transport.get(route.request().url());
    await route.fulfill({ response });
  });
  await context.route(/https:\/\/[^/]*google-analytics\.com\/g\/collect/, async route => {
    const request = route.request(); const url = new URL(request.url());
    const rows = request.postData()?.split('\n').filter(Boolean) || [''];
    const status = captureOnly ? null : (await route.fetch()).status();
    for (const row of rows) {
      const params = new URLSearchParams(url.search);
      for (const [key, value] of new URLSearchParams(row)) params.set(key, value);
      report.events.push({ name: params.get('en'), destination: params.get('tid'),
        location: params.get('dl'), title: params.get('dt'),
        engagementMS: Number(params.get('_et') || params.get('epn.engagement_time_msec') || 0),
        debug: params.get('_dbg') || params.get('ep.debug_mode'), responseStatus: status });
    }
    await route.fulfill({ status: status || 204 });
  });
  const page = await context.newPage();
  page.on('request', request => { if (request.url().startsWith('https://www.googletagmanager.com/gtag/js?')) scriptLoads++; });
  page.on('pageerror', error => report.errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  const response = await page.goto(origin + '/', { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'How to tell if an avocado is ripe', exact: true }).click();
  await page.waitForURL(origin + '/avocado');
  await page.waitForTimeout(2000);
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForURL(origin + '/');
  await page.waitForTimeout(2000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('link', { name: 'How to tell if an avocado is ripe', exact: true }).click();
  await page.waitForURL(origin + '/avocado');
  await page.getByRole('button', { name: 'Choose A', exact: true }).click();
  assert(['CORRECT_FEEDBACK', 'WRONG_FEEDBACK'].includes(await page.locator('#quiz').getAttribute('data-game-state')));
  await page.waitForTimeout(3000);
  for (let attempt = 0; attempt < 40 && report.events.filter(event => event.name === 'page_view').length < 4; attempt++) {
    await page.waitForTimeout(250);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390);
  const destinations = await page.evaluate(() => (window.dataLayer || []).filter(entry => entry?.[0] === 'config').map(entry => entry[1]));
  assert.deepEqual(destinations, [id]); assert.equal(scriptLoads, 1);
  const views = report.events.filter(event => event.name === 'page_view');
  assert.deepEqual(views.map(event => new URL(event.location).pathname), ['/', '/avocado', '/', '/avocado'], 'One real GA4 page_view per page load/history change');
  assert(report.events.every(event => event.destination === id));
  assert(report.events.some(event => event.engagementMS > 0), 'Expected actual GA4 engagement time');
  if (!captureOnly) {
    assert(report.events.every(event => event.responseStatus === 204), 'Google collection endpoint must accept the events');
    assert(views.every(event => new URL(event.location).origin === origin));
  }
  assert.deepEqual(report.errors, []);
  await page.screenshot({ path: path.join(out, 'avocado-390.png') });
  report.scriptLoads = scriptLoads; report.pageViews = views.length;
  report.status = 'PASS';
  console.log(`PASS: actual Google tag ${id}, one initialization, four correct pageviews and engagement time; ${captureOnly ? 'requests intercepted' : 'Google collection HTTP 204'}`);
} catch (error) {
  report.status = 'FAIL'; report.failure = String(error); throw error;
} finally {
  fs.writeFileSync(path.join(out, 'collection.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
  await transport.dispose();
}
