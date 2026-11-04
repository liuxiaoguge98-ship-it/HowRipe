import {chromium} from 'playwright';import fs from 'node:fs';import assert from 'node:assert/strict';
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:3000';const remote=origin.startsWith('https:');const out=process.env.QA_OUTPUT||'docs/qa/pear-01/local';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true,proxy:remote&&process.env.HTTPS_PROXY?{server:new URL(process.env.HTTPS_PROXY).origin}:undefined});
const context=await browser.newContext({deviceScaleFactor:1,reducedMotion:'reduce'});
await context.route('https://www.googletagmanager.com/**',r=>r.fulfill({contentType:'application/javascript',body:''}));await context.route('**/g/collect**',r=>r.fulfill({status:204,body:''}));
const report={origin,pages:[],errors:[]};
try{
if(process.env.VERCEL_AUTOMATION_BYPASS_SECRET){const auth=await context.request.get(origin+'/',{maxRedirects:0,headers:{'x-vercel-protection-bypass':process.env.VERCEL_AUTOMATION_BYPASS_SECRET,'x-vercel-set-bypass-cookie':'true'}});assert([200,307].includes(auth.status()));}
const page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
for(const width of [1440,390])for(const route of (process.env.QA_BASELINE?['/']:['/','/pear'])){
 await page.setViewportSize({width,height:width===390?844:1000});const response=await page.goto(origin+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,25))}});await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));await page.evaluate(()=>window.scrollTo(0,0));
 const name=route==='/'?'home':'pear';await page.screenshot({path:`${out}/${name}-${width}-full.png`,fullPage:true});await page.screenshot({path:`${out}/${name}-${width}-hero.png`});
 const state=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelector('h1')?.textContent,english:!/[\u3400-\u9fff]/u.test(document.body.innerText),broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,canonical:document.querySelector('[rel="canonical"]')?.href,highPriority:document.querySelectorAll('img[fetchpriority="high"]').length}));assert.equal(state.scrollWidth,width);assert.equal(state.english,true);report.pages.push({route,width,...state});
 if(route==='/pear'){
 for(const [slug,selector]of Object.entries({type:'#know-type',neck:'#check-neck',place:'#dont-press-belly',color:'#color-by-variety',ripening:'#control-ripening',quiz:'#quiz'})){await page.locator(selector).screenshot({path:`${out}/pear-${width}-${slug}.png`});}
 }
 console.log(`Captured ${name} ${width}`);
}
assert.equal(report.errors.length,0);report.status='PASS';
}finally{fs.writeFileSync(`${out}/capture.json`,JSON.stringify(report,null,2));await browser.close()}
