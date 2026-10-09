// Checks Chrome's actual tab-icon cache in an isolated, disposable profile.
import { chromium } from 'playwright';
import { DatabaseSync } from 'node:sqlite';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const sharp = createRequire(import.meta.resolve('next'))('sharp');
const origin = process.env.QA_ORIGIN || 'http://localhost:3108';
const out = process.env.QA_OUTPUT || 'docs/qa/brand-logo-02/local';
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'howripe-brand-favicon-'));
const proxy = process.env.QA_PREVIEW === '1' && process.env.HTTPS_PROXY ? { server: new URL(process.env.HTTPS_PROXY).origin } : undefined;
let context;
try {
  context = await chromium.launchPersistentContext(profile, { channel: 'chrome', headless: false, proxy });
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    const auth = await context.request.get(origin + '/', {
      maxRedirects: 0, maxRetries: 2,
      headers: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' },
    }).catch(() => { throw new Error('Favicon QA cookie authentication transport failed'); });
    assert([200, 307].includes(auth.status()), 'Favicon QA authentication failed');
  }
  const page = context.pages()[0];
  await page.goto(origin + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await context.close(); context = null;
  const db = new DatabaseSync(path.join(profile, 'Default', 'Favicons'), { readOnly: true });
  const rows = db.prepare(`SELECT f.url, b.width, b.height, b.image_data
    FROM icon_mapping m JOIN favicons f ON m.icon_id = f.id
    JOIN favicon_bitmaps b ON b.icon_id = f.id WHERE m.page_url = ?`).all(origin + '/');
  db.close();
  const frames = [];
  for (const size of [16, 32]) {
    const row = rows.find(row => row.width === size && row.height === size);
    assert(row, `Missing ${size}px browser tab icon`);
    const pixels = await sharp(row.image_data).ensureAlpha().raw().toBuffer();
    const expected = await sharp(`public/favicon-${size}x${size}.png`).ensureAlpha().raw().toBuffer();
    assert(pixels.equals(expected), `${size}px cached tab icon differs from Ripe Signal export`);
    fs.writeFileSync(path.join(out, `chrome-tab-icon-${size}.png`), row.image_data);
    frames.push({ size, cachedIconUrl: row.url, decodedPixelsEqualExport: true });
  }
  fs.writeFileSync(path.join(out, 'favicon-cache.json'), JSON.stringify({ status: 'PASS', origin, isolatedChromeProfile: true, frames }, null, 2) + '\n');
  console.log('PASS Chrome tab-icon cache: 16/32px pixels match Ripe Signal exports');
} finally {
  if (context) await context.close();
  fs.rmSync(profile, { recursive: true, force: true });
}
