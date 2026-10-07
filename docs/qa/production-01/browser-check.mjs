import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin=process.argv[2] || 'https://www.howripe.com';
const out=process.argv[3] || 'docs/qa/production-01/live-browser';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try{
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&new URL(r.url()).origin===origin)failed.push({url:r.url(),status:r.status()})});
 for(const route of ['/','/avocado','/kiwi','/pomegranate','/persimmon']){
  const response=await page.goto(origin+route,{waitUntil:'networkidle',timeout:60000});assert.equal(response.status(),200);
  await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,route);
  const h1=await page.locator('h1').innerText();assert.equal(await page.locator('h1').count(),1);
  await page.screenshot({path:`${out}/${width}-${route.slice(1)||'home'}.png`});
  if(route==='/'){
   for(const fruit of ['avocado','kiwi','pomegranate','persimmon'])assert.equal(await page.locator(`a[href="/${fruit}"]`).count(),1);
   await page.locator('a[href="/kiwi"]').click();await page.waitForURL(origin+'/kiwi');
  }else{
   assert.equal(await page.locator('#quiz img').count(),2);
   await page.locator('#quiz').scrollIntoViewIfNeeded();
   await page.getByRole('button',{name:'Choose A',exact:true}).click();
   await page.getByRole('button',{name:'Got it →',exact:true}).click();await page.waitForTimeout(450);
   assert.equal(await page.locator('#quiz').getAttribute('data-game-state'),'ANSWERING');
   await page.locator('header a[href="/"]').click();await page.waitForURL(origin+'/');
  }
  results.push({route,width,status:response.status(),h1,quiz:route!=='/',horizontalOverflow:0});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await page.close();
}
fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await browser.close()}
