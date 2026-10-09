import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const sharp = createRequire(import.meta.resolve('next'))('sharp');
const out = 'docs/qa/brand-logo-02/final';
fs.mkdirSync(out, { recursive: true });
const ico = fs.readFileSync('public/favicon.ico');
const frames = [16, 32, 48].map((size, index) => {
  const entry = 6 + index * 16, start = ico.readUInt32LE(entry + 12), length = ico.readUInt32LE(entry + 8);
  return { size, png: ico.subarray(start, start + length) };
});

function regions(pixels, size, accepts) {
  const candidates = new Set();
  for (let i = 0; i < size * size; i++) if (accepts(...pixels.subarray(i * 4, i * 4 + 3))) candidates.add(i);
  const result = [];
  while (candidates.size) {
    const first = candidates.values().next().value, pending = [first], points = [];
    candidates.delete(first);
    while (pending.length) {
      const i = pending.pop(), x = i % size, y = Math.floor(i / size); points.push([x, y]);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy, next = ny * size + nx;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && candidates.delete(next)) pending.push(next);
      }
    }
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    result.push({ pixels: points.length, x: Math.min(...xs), y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs) + 1, height: Math.max(...ys) - Math.min(...ys) + 1 });
  }
  return result.sort((a, b) => a.pixels - b.pixels);
}

const report = [];
for (const { size, png } of frames) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, size); assert.equal(info.height, size);
  assert([...data].filter((_, index) => index % 4 === 3).every(alpha => alpha === 255));
  const green = regions(data, size, (r, g, b) => g > 120 && g - b > 45 && g - r > 12);
  const ivory = regions(data, size, (r, g, b) => r > 160 && g > 160 && b > 140 && Math.abs(r - g) < 10 && r - b < 35);
  assert.equal(green.length, 2, `${size}px: central dot and short signal arc must remain separate`);
  assert(green.every(region => region.pixels >= 4), `${size}px: accent must not disappear into isolated pixels`);
  assert.equal(ivory.length, 1, `${size}px: strong C arc must remain continuous`);
  fs.writeFileSync(path.join(out, `favicon-${size}.png`), png);
  report.push({ size, status: 'PASS', opaque: true, distinctGreenRegions: green, continuousIvoryArc: ivory[0] });
}
fs.writeFileSync(path.join(out, 'favicon-pixels.json'), JSON.stringify(report, null, 2) + '\n');

const image = file => `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1120, height: 640 }, deviceScaleFactor: 1 });
  const columns = [
    ['A1 / HISTORICAL', 'Abstract oval + perimeter dot', 'docs/qa/brand-logo-02/baseline'],
    ['RIPE SIGNAL / ROUND 1', 'Full three-arc artwork at tab size', 'docs/qa/brand-logo-02/round-1'],
    ['RIPE SIGNAL / FINAL', 'Two arcs + separated central dot', 'public'],
  ].map(([title, subtitle, folder]) => `<section><h2>${title}</h2><p>${subtitle}</p><div class="actual"><img width="16" height="16" src="${image(`${folder}/favicon-16x16.png`)}"><span>16px</span><img width="32" height="32" src="${image(`${folder}/favicon-32x32.png`)}"><span>32px</span></div><div class="zoom"><img width="128" height="128" src="${image(`${folder}/favicon-16x16.png`)}"><img width="128" height="128" src="${image(`${folder}/favicon-32x32.png`)}"></div><p class="muted">16px @ 8× · 32px @ 4×<br>Nearest-pixel display; source pixels unchanged.</p></section>`).join('');
  await page.setContent(`<!doctype html><html lang="en"><style>*{box-sizing:border-box}body{margin:0;padding:36px;background:#F5F2E9;color:#2F3B27;font:14px Arial,sans-serif}h1{font-size:17px;font-weight:500;letter-spacing:.1em;margin:0 0 32px}main{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}section{border:1px solid #d9d5ca;padding:24px 20px}h2{font-size:11px;letter-spacing:.12em;font-weight:500;margin:0 0 14px}p{font-size:12px;line-height:1.7;margin:0}.actual{display:flex;align-items:center;gap:18px;height:90px;font-size:11px}.zoom{display:flex;gap:14px;margin-bottom:20px}.zoom img{image-rendering:pixelated}.muted{color:#646456}footer{margin-top:28px;border-top:1px solid #d9d5ca;padding-top:20px;display:flex;align-items:center;gap:24px;font-size:12px}</style><h1>HOWRIPE / FAVICON COMPARISON</h1><main>${columns}</main><footer><img width="48" height="48" src="${image(path.join(out,'favicon-48.png'))}"><span>Final 48px ICO source · central dot and signal arc remain separate.<br>16 / 32 / 48: two discrete green regions, one continuous ivory C.</span></footer></html>`);
  await page.screenshot({ path: path.join(out, 'favicon-comparison.png'), fullPage: true });
} finally { await browser.close(); }
console.log(JSON.stringify(report, null, 2));
