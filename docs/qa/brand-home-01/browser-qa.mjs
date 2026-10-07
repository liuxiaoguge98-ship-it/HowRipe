import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const origin = process.env.QA_ORIGIN || 'http://localhost:3101';
const out = process.env.QA_OUTPUT || 'docs/qa/brand-home-01/local';
const preview = process.env.QA_PREVIEW === '1';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'no-preference' });
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
if (bypass) await context.route(url => url.origin === new URL(origin).origin, route => route.continue({headers:{...route.request().headers(),'x-vercel-protection-bypass':bypass}}));
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
const report = { origin, routes: [], quiz: [], errors };
const widths = preview ? [1440, 390] : [1440, 1024, 768, 390, 360];
const routes = ['/', '/avocado', '/kiwi', '/pomegranate', '/persimmon'];
try {
for (const width of widths) {
  await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
  for (const route of routes) {
    const res = await page.goto(origin + route, { waitUntil: 'networkidle' });
    assert.equal(res.status(), 200);
    await page.waitForTimeout(650);
    // Exercise native lazy loading throughout the real document.
    await page.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=750) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,35)); } });
    await page.waitForFunction(() => [...document.images].every(i => !i.checkVisibility() || (i.complete && i.naturalWidth > 0)));
    await page.evaluate(() => window.scrollTo(0,0));
    const data = await page.evaluate(() => {
      const root = document.documentElement;
      const h1 = document.querySelector('h1');
      const headings = [...document.querySelectorAll('h1,h2,h3')].map(e=>({level:Number(e.tagName.slice(1)),text:e.textContent}));
      return {
        width:root.clientWidth, scrollWidth:root.scrollWidth, h1Count:document.querySelectorAll('h1').length,
        h1:h1.textContent, font:getComputedStyle(h1).fontFamily, fontSize:getComputedStyle(h1).fontSize,
        title:document.title, canonical:document.querySelector('link[rel="canonical"]')?.href,
        ogSiteName:document.querySelector('meta[property="og:site_name"]')?.content,
        language:root.lang, chinese:/\p{Script=Han}/u.test(document.body.innerText), otherLanguage:[...document.querySelectorAll('[lang]')].filter(e=>!e.lang.startsWith('en')).length,
        oldBrand:/fruit picking guide|fruit-picking-guide/i.test(document.body.innerText),
        imageCount:document.images.length, brokenImages:[...document.images].filter(i=>i.checkVisibility()&&(!i.complete||!i.naturalWidth)).length,
        headerBrand:document.querySelector('header a').textContent, footerBrand:document.querySelector('footer a').textContent,
        headingSkips:headings.filter((h,i)=>i>0&&h.level>headings[i-1].level+1),
        brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),
        missingAlts:document.querySelectorAll('img:not([alt])').length,
        shellTargets:[...document.querySelectorAll('header a,footer a')].map(a=>({name:a.textContent,height:a.getBoundingClientRect().height})),
      };
    });
    assert.equal(data.scrollWidth,data.width,`${route} ${width}: overflow`);
    assert.equal(data.h1Count,1); assert.equal(data.language,'en'); assert.equal(data.chinese,false); assert.equal(data.otherLanguage,0); assert.equal(data.oldBrand,false);
    assert.equal(data.headerBrand,'HowRipe'); assert.equal(data.footerBrand,'HowRipe'); assert.equal(data.ogSiteName,'HowRipe');
    assert.equal(data.canonical.replace(/\/$/,''),('https://www.howripe.com'+route).replace(/\/$/,''));
    assert.equal(data.brokenImages,0); assert.equal(data.missingAlts,0); assert.deepEqual(data.brokenAnchors,[]);
    assert(data.shellTargets.every(t=>t.height>=44));
    report.routes.push({route,...data});
    if(route==='/' || width===1440 || width===390) {
      await page.screenshot({path:path.join(out,`${route.slice(1)||'home'}-${width}.png`),fullPage:route==='/'});
    }
    if(route==='/' && [1440,390].includes(width)) {
      await page.screenshot({path:path.join(out,`hero-${width}.png`)});
      await page.locator('#fruit-guides').screenshot({path:path.join(out,`fruit-index-${width}.png`)});
      await page.locator('footer').screenshot({path:path.join(out,`footer-${width}.png`)});
      // Check genuine link hover and pointer-independent keyboard focus.
      const entry=page.locator('#fruit-guides article a').first(); await entry.hover();
      await page.screenshot({path:path.join(out,`hover-${width}.png`)});
      await page.goto(origin); await page.keyboard.press('Tab');
      const focus=await page.evaluate(()=>({text:document.activeElement.textContent,outline:getComputedStyle(document.activeElement).outlineStyle}));
      assert.equal(focus.text,'HowRipe'); assert.equal(focus.outline,'solid');
      await page.keyboard.press('Tab'); await page.keyboard.press('Enter'); await page.waitForTimeout(200);
      assert.equal(new URL(page.url()).hash,'#fruit-guides');
      await page.locator('#fruit-guides article a').first().click(); await page.waitForURL('**/avocado');
      await page.locator('header a').first().click(); await page.waitForURL(origin+'/');
    }
    if(route!=='/' && [1440,390].includes(width)) {
      await page.locator('#quiz').scrollIntoViewIfNeeded();
      const checks=page.getByRole('button',{name:/Check firmness/});
      if(await checks.count()) {await checks.first().click();assert.equal(await page.locator('#quiz').getAttribute('data-game-state'),'ANSWERING');}
      const states=[];
      for(let q=0;q<5;q++) {
        await page.getByRole('button',{name:q%2===0?'Choose A':'Choose B',exact:true}).click();
        const state=await page.locator('#quiz').getAttribute('data-game-state');
        assert(['CORRECT_FEEDBACK','WRONG_FEEDBACK'].includes(state)); states.push(state);
        assert.equal(await page.getByRole('button',{name:/^Got it/}).isVisible(),true);
        assert.equal(await page.evaluate(()=>/\p{Script=Han}/u.test(document.querySelector('#quiz').innerText)),false);
        await page.getByRole('button',{name:/^Got it/}).click(); await page.waitForTimeout(450);
      }
      assert.equal(await page.locator('#quiz').getAttribute('data-game-state'),'COMPLETED');
      await page.getByRole('button',{name:'Restart',exact:true}).click();
      assert.equal(await page.locator('#quiz').getAttribute('data-game-state'),'ANSWERING');
      const faq=page.locator('summary').first(); if(await faq.count()){await faq.click();assert.equal(await faq.evaluate(e=>e.parentElement.open),true);}
      report.quiz.push({route,width,states,completed:true,restart:true});
    }
    console.log(`PASS ${route} ${width}: English, assets, shell, canonical, no overflow`);
  }
}
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(origin);await page.waitForTimeout(100);
report.reducedMotion=await page.locator('.motion-hero-text').evaluate(e=>({animation:getComputedStyle(e).animationName,opacity:getComputedStyle(e).opacity}));
assert.equal(report.reducedMotion.animation,'none');assert.equal(report.reducedMotion.opacity,'1');
report.fontsUnified=new Set(report.routes.map(r=>r.font)).size===1;assert.equal(report.fontsUnified,true);
report.crawl={};for(const file of ['/robots.txt','/sitemap.xml']){const res=await page.request.get(origin+file, {headers:bypass?{'x-vercel-protection-bypass':bypass}:{}});assert.equal(res.status(),200);const text=await res.text();assert(text.includes('https://www.howripe.com'));report.crawl[file]={status:res.status(),body:text};}
assert.deepEqual(errors,[]);
report.status='PASS';
} catch(e) { report.status='FAIL';report.failure=String(e);throw e; }
finally {fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify(report,null,2)+'\n');await browser.close();}
