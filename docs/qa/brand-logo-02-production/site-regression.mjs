import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { request } from 'playwright';
import { JSDOM } from 'jsdom';

const origin = 'https://www.howripe.com';
const output = process.env.QA_SITE_SNAPSHOT;
assert(output, 'Set QA_SITE_SNAPSHOT to the output JSON path');
const proxy = process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin } : undefined;
const client = await request.newContext({ proxy });
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const report = { origin, capturedAt: new Date().toISOString(), status: 'RUNNING' };
try {
  const paths = ['/', '/avocado', '/kiwi', '/pomegranate', '/persimmon', '/robots.txt', '/sitemap.xml'];
  const responses = await Promise.allSettled(paths.map(async route => {
    const response = await client.get(origin + route, { timeout: 45000 });
    assert.equal(response.status(), 200, route);
    assert.equal(response.url(), origin + route, route + ': unexpected redirect');
    return { route, text: await response.text() };
  }));
  const resources = responses.map(result => { if (result.status === 'rejected') throw result.reason; return result.value; });
  const routes = resources.filter(r => !r.route.endsWith('.txt') && !r.route.endsWith('.xml')).map(({ route, text }) => {
    const document = new JSDOM(text, { url: origin + route }).window.document;
    const main = document.querySelector('main').cloneNode(true);
    main.querySelectorAll('script, style').forEach(node => node.remove());
    const canonical = document.querySelector('link[rel="canonical"]').href;
    assert.equal(canonical, origin + route);
    assert.equal(document.querySelectorAll('h1').length, 1);
    assert.equal(document.documentElement.lang, 'en');
    return { route, canonical, title: document.title,
      description: document.querySelector('meta[name="description"]').content,
      robots: document.querySelector('meta[name="robots"]')?.content || null,
      h1: document.querySelector('h1').textContent,
      mainTextSHA256: hash(main.textContent.replace(/\s+/g, ' ').trim()),
      mainLinksSHA256: hash(JSON.stringify([...main.querySelectorAll('a')].map(a => ({ href: a.getAttribute('href'), text: a.textContent.replace(/\s+/g, ' ').trim() })))),
      jsonLdSHA256: hash(JSON.stringify([...document.querySelectorAll('script[type="application/ld+json"]')].map(script => JSON.parse(script.textContent)))),
    };
  });
  const robots = resources.find(r => r.route === '/robots.txt').text;
  const sitemap = resources.find(r => r.route === '/sitemap.xml').text;
  assert(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
  assert(robots.includes('Sitemap: ' + origin + '/sitemap.xml'));
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]).sort(), paths.slice(0, 5).map(route => origin + route).sort());
  report.snapshot = { routes, robots: { text: robots, sha256: hash(robots) }, sitemap: { text: sitemap, sha256: hash(sitemap) } };
  if (process.env.QA_SITE_BASELINE) {
    const before = JSON.parse(fs.readFileSync(process.env.QA_SITE_BASELINE));
    assert.equal(before.status, 'PASS');
    assert.deepEqual(report.snapshot, before.snapshot, 'Production content/SEO/crawl differs from pre-release baseline');
    report.comparison = 'PASS: all five route signatures and exact robots/sitemap bytes unchanged';
  }
  report.status = 'PASS';
  console.log(report.comparison || 'PASS: pre-release production content/SEO/crawl baseline captured');
} catch (error) {
  report.status = 'FAIL'; report.failure = String(error); throw error;
} finally {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  await client.dispose();
}
