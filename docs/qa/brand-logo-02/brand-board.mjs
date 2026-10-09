import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const sharp = createRequire(import.meta.resolve('next'))('sharp');
const origin = process.env.QA_ORIGIN || 'http://localhost:3108';
const out = process.env.QA_OUTPUT || 'docs/qa/brand-logo-02/final';
fs.mkdirSync(out, { recursive: true });
const data = (file, type = file.endsWith('.svg') ? 'image/svg+xml' : 'image/png') => `data:${type};base64,${fs.readFileSync(file).toString('base64')}`;
const asset = name => data(`public/${name}`);
const old = name => data(`docs/qa/brand-logo-02/baseline/${name}`);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const metrics = [];
  const { info } = await sharp('public/brand/howripe-mark.svg').trim().png().toBuffer({ resolveWithObject: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.locator('header img').evaluate(image => image.decode());
    await page.locator('header').screenshot({ path: path.join(out, `header-${width}.png`) });
    await page.locator('header .site-wordmark').screenshot({ path: path.join(out, `lockup-${width}.png`) });
    await page.screenshot({ path: path.join(out, `home-${width}.png`) });
    const metric = await page.locator('header .site-wordmark').evaluate(link => {
      const style = getComputedStyle(link);
      const canvas = document.createElement('canvas'); const context = canvas.getContext('2d');
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const h = context.measureText('H');
      return { headerHeight: document.querySelector('header').getBoundingClientRect().height,
        capHeight: h.actualBoundingBoxAscent + h.actualBoundingBoxDescent,
        markBoxHeight: link.querySelector('img').getBoundingClientRect().height,
        liveText: link.textContent, accent: getComputedStyle(link.querySelector('.site-wordmark-i'), '::after').color };
    });
    metrics.push({ width, ...metric, inkToCapRatio: Number((metric.markBoxHeight * info.height / 72 / metric.capHeight).toFixed(3)) });
  }
  const frame48 = fs.readFileSync('public/favicon.ico');
  const offset48 = frame48.readUInt32LE(6 + 2 * 16 + 12), length48 = frame48.readUInt32LE(6 + 2 * 16 + 8);
  fs.writeFileSync(path.join(out, 'favicon-48.png'), frame48.subarray(offset48, offset48 + length48));
  for (const file of ['favicon-16x16.png', 'favicon-32x32.png']) fs.copyFileSync(`public/${file}`, path.join(out, file));
  const metricsText = metrics.map(m => `${m.width}px: mark / H = ${m.inkToCapRatio.toFixed(2)}×`).join(' · ');
  await page.setViewportSize({ width: 1280, height: 1160 });
  await page.setContent(`<!doctype html><html lang="en"><style>
    *{box-sizing:border-box}body{margin:0;padding:42px;background:#F5F2E9;color:#2F3B27;font-family:Arial,sans-serif}
    h1{font-size:17px;letter-spacing:.13em;font-weight:500;margin:0}header{display:flex;justify-content:space-between;align-items:center;padding-bottom:26px;border-bottom:1px solid #d9d5ca}
    .caption,.eyebrow{font-size:11px;letter-spacing:.12em;line-height:1.7}.eyebrow{margin-bottom:22px}.muted{color:#646456}.panels{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px}
    .panel{padding:30px;min-height:202px;border:1px solid #dedbcf;border-radius:4px}.dark{background:#2F3B27;color:#F5F2E9;border-color:#2F3B27}
    .logo{width:360px;max-width:100%;height:108px;object-fit:contain;object-position:left center}.mark{width:60px;height:60px}.row{display:flex;gap:30px;align-items:center}.small-row{display:flex;gap:26px;align-items:center}
    .sample{display:flex;gap:12px;align-items:center}.pixel{image-rendering:pixelated}.header-panel{padding-bottom:24px}.header-image{max-width:100%;height:auto}.phone-header{width:390px;border:1px solid #dedbcf}
    .compare{display:flex;align-items:center;justify-content:space-between;gap:28px}.old-logo{width:210px;height:auto;opacity:.8}.new-logo{width:240px;height:auto}.footer{margin-top:22px;padding-top:18px;border-top:1px solid #d9d5ca;display:flex;justify-content:space-between}
  </style><header><h1>HOWRIPE / RIPE SIGNAL</h1><span class="caption muted">BRAND-LOGO-02 · ${out.includes('round-1') ? 'ROUND 1' : 'REFINED SYSTEM'}<br>READY MOMENT + PROGRESSIVE GUIDANCE</span></header>
  <div class="panels"><div class="panel"><div class="eyebrow">PRIMARY HORIZONTAL LOCKUP / WARM IVORY</div><img class="logo" src="${asset('brand/howripe-logo.svg')}"></div>
  <div class="panel dark"><div class="eyebrow">REVERSE LOCKUP / DEEP FOREST</div><img class="logo" src="${asset('brand/howripe-logo-reverse.svg')}"></div></div>
  <div class="panels"><div class="panel"><div class="eyebrow">MARK ONLY / TWO FLAT BRAND COLORS</div><div class="row"><img class="mark" src="${asset('brand/howripe-mark.svg')}"><span class="caption">#2F3B27 / DEEP FOREST<br>#A8C94A / RIPE GREEN<br>#F5F2E9 / WARM IVORY</span><img class="mark" style="background:#2F3B27;padding:5px;box-sizing:content-box" src="${asset('brand/howripe-mark-reverse.svg')}"></div></div>
  <div class="panel"><div class="eyebrow">APPLE / APP ICON</div><div class="row"><img width="96" height="96" src="${asset('apple-touch-icon.png')}"><img width="72" height="72" src="${asset('icon-192.png')}"><span class="caption muted">180 / 192 / 512<br>OPAQUE SQUARE<br>NO SHADOW / NO 3D</span></div></div></div>
  <div class="panels"><div class="panel"><div class="eyebrow">FAVICONS / ACTUAL CSS PIXELS</div><div class="small-row"><div class="sample"><img width="16" height="16" src="${asset('favicon-16x16.png')}"><span class="caption">16</span></div><div class="sample"><img width="32" height="32" src="${asset('favicon-32x32.png')}"><span class="caption">32</span></div><div class="sample"><img width="48" height="48" src="${data(path.join(out, 'favicon-48.png'))}"><span class="caption">48</span></div></div></div>
  <div class="panel"><div class="eyebrow">RASTER INSPECTION / NEAREST-PIXEL ZOOM</div><div class="row"><img class="pixel" width="96" height="96" src="${asset('favicon-16x16.png')}"><img class="pixel" width="96" height="96" src="${asset('favicon-32x32.png')}"><span class="caption muted">16 @ 6×<br>32 @ 3×</span></div></div></div>
  <div class="panels"><div class="panel header-panel"><div class="eyebrow">LIVE HEADER / DESKTOP LOCKUP</div><img class="header-image" src="${data(path.join(out,'lockup-1440.png'))}"><p class="caption muted">${metricsText}<br>Existing rounded Sans · one accent i-dot</p></div>
  <div class="panel header-panel"><div class="eyebrow">LIVE HEADER / 390PX</div><img class="header-image phone-header" src="${data(path.join(out,'header-390.png'))}"><p class="caption muted">Existing navigation and spacing retained.</p></div></div>
  <div class="panel" style="margin-top:20px;min-height:120px"><div class="eyebrow">A1 → RIPE SIGNAL / HISTORICAL COMPARISON ONLY</div><div class="compare"><img class="old-logo" src="${old('howripe-logo.svg')}"><div class="sample"><img width="16" height="16" src="${old('favicon-16x16.png')}"><img width="32" height="32" src="${old('favicon-32x32.png')}"></div><span class="caption muted">ABSTRACT FRUIT →<br>READINESS + PROGRESS</span><img class="new-logo" src="${asset('brand/howripe-logo.svg')}"><div class="sample"><img width="16" height="16" src="${asset('favicon-16x16.png')}"><img width="32" height="32" src="${asset('favicon-32x32.png')}"></div></div></div>
  <div class="footer caption muted"><span>QA SHEET / NOT WEBSITE UI</span><span>HOWRIPE · OBSERVE / CHECK / READY</span></div></html>`);
  await page.screenshot({ path: path.join(out, 'brand-board.png'), fullPage: true });
  fs.writeFileSync(path.join(out, 'geometry.json'), JSON.stringify({ masterInk: { width: info.width, height: info.height }, header: metrics }, null, 2) + '\n');
  console.log(JSON.stringify({ out, header: metrics }, null, 2));
} finally { await browser.close(); }
