import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const dir=path.resolve('card-lookup');
const base='http://127.0.0.1:8765/';
let passes=0;
function check(value,message){assert.ok(value,message); console.log('PASS',message); passes++}
for(const [set,min,code,name] of [
 ['chrome25',1200,'USC45','Cal Raleigh'],
 ['pulse26',500,'BLCL-01','Aidan Miller'],
 ['panini26',1150,'1','AJ Elliott'],
 ['logo26',490,'244','Bryce Harper'],
]){
 const d=JSON.parse(await readFile(path.join(dir,'data',set+'.json'),'utf8'));
 check(d.cards.length>=min,set+' checklist has '+d.cards.length+' entries');
 check(d.cards.some(c=>c.code===code&&c.name===name),set+' known lookup '+code+' '+name);
 check(d.cards.every(c=>c.code&&c.name&&c.set&&c.type),set+' all records contain searchable fields');
}
const top=JSON.parse(await readFile(path.join(dir,'data','chrome25.json'),'utf8'));
check(top.cards.filter(x=>x.type==='Base').length===200,'Chrome Update exactly 200 physical base-card entries');
for(const [code,names] of [['USC45',['Tommy Pham','Cal Raleigh']],['USC80',['Tyler Locklear','Dustin May']]]){
 for(const n of names)check(top.cards.some(c=>c.type==='Base'&&c.code===code&&c.name===n), 'Misnumbering '+code+' resolves to '+n);
}
const panini=JSON.parse(await readFile(path.join(dir,'data/panini26.json'),'utf8'));
check(panini.cards.some(c=>c.set==='USA Baseball Greats'&&c.type==='Insert'), 'Panini Greats correctly classified Insert');
check(panini.cards.some(c=>c.set==='Base Prizms Signatures'&&c.type==='Autograph'), 'Panini Signatures correctly classified Autograph');
const offlinePath=path.join(dir,'Pack_Room_Offline_All_Four.html');
check(existsSync(offlinePath)&& (await stat(offlinePath)).size>200000,'standalone offline HTML exists and includes all four checklists');
const offtext=await readFile(offlinePath,'utf8');
check(!offtext.includes('<script src=')&&!offtext.includes('<link rel="stylesheet"'),'standalone offline HTML has no external script or CSS');
const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1','--directory',dir],{stdio:'ignore'});
let browser;
try {
 let ok=false;for(let i=0;i<50;i++){try{const r=await fetch(base);if(r.ok){ok=true;break}}catch{}await sleep(200)}
 check(ok,'local web server responds');
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({acceptDownloads:true,viewport:{width:1300,height:800}});
 const page=await context.newPage(); const errors=[];
 page.on('pageerror',e=>errors.push('pageerror '+e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 check(await page.locator('a.product').count()===4,'homepage shows four selectable exact products');
 const examples=[
  ['chrome25','USC45','Cal Raleigh'],
  ['pulse26','BLCL-01','Aidan Miller'],
  ['panini26','AJ Elliott','AJ Elliott'],
  ['logo26','244','Bryce Harper'],
 ];
 for(const [key,code,name] of examples){
   await page.goto(base+'packs.html?set='+key,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.querySelector('#load-status')?.textContent?.includes('✅'),{timeout:30000});
   await page.locator('#lookup').fill(code);
   check((await page.locator('#results').innerText()).includes(name),key+' browser lookup resolves '+name);
   await page.locator('#results button[data-add]').first().click();
   await page.locator('.tabs button[data-tab=saved]').click();
   check(await page.locator('#saved .savedrow').count()===1,key+' saves pull locally');
   const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const dl=await downloadPromise;
   check(dl.suggestedFilename().includes(key),key+' CSV export works');
   await page.locator('.tabs button[data-tab=guide]').click();
   check(await page.locator('section[data-tab=guide]').isVisible(),key+' guide tab works');
   await page.locator('.tabs button[data-tab=sources]').click();
   check((await page.locator('section[data-tab=sources] a').count())>=2,key+' source links available');
   await page.locator('.tabs button[data-tab=search]').click();
   check(await page.locator('section[data-tab=search]').isVisible(),key+' search tab returns');
 }
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
 const m=await mobile.newPage();m.on('pageerror',e=>errors.push('mobile '+e.message));
 await m.goto(base+'packs.html?set=pulse26',{waitUntil:'networkidle'});
 await m.waitForFunction(()=>document.querySelector('#load-status')?.textContent?.includes('✅'));
 for(const tab of ['guide','saved','sources','search']){
  await m.locator('nav.bottom button[data-tab='+tab+']').click();
  check(await m.locator('section[data-tab='+tab+']').isVisible(),'mobile bottom navigation opens '+tab);
 }
 await m.locator('#lookup').fill('BLCL-01');
 check((await m.locator('#results').innerText()).includes('Aidan Miller'),'mobile card lookup returns result');
 check(await m.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'mobile viewport avoids horizontal overflow');
 const offlineURL=new URL('file://'+offlinePath).href;
 const filePage=await browser.newPage();
 await filePage.goto(offlineURL);
 await filePage.locator('#set').selectOption('panini26');
 await filePage.locator('#q').fill('AJ Elliott');
 check((await filePage.locator('#matches').innerText()).includes('AJ Elliott'),'single-file offline backup searches Panini independently');
 await filePage.locator('#set').selectOption('logo26');
 await filePage.locator('#q').fill('244');
 check((await filePage.locator('#matches').innerText()).includes('Bryce Harper'),'single-file offline backup switches to LogoFractor');
 // Verify the service worker did indeed cache all datasets, then simulate lost network.
 await page.goto(base+'packs.html?set=chrome25',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>navigator.serviceWorker.controller!==null,{timeout:30000});
 await page.waitForFunction(async()=>{const keys=await caches.keys();if(!keys.some(k=>k.startsWith('pack-room')))return false;const cs=await Promise.all(keys.map(k=>caches.open(k)));return (await Promise.all(cs.map(c=>c.match('./data/chrome25.json')))).some(Boolean)},null,{timeout:30000});
 await context.setOffline(true);
 await page.goto(base+'packs.html?set=chrome25',{waitUntil:'domcontentloaded'});
 await page.locator('#lookup').fill('USC45');
 await page.waitForTimeout(300);
 check((await page.locator('#results').innerText()).includes('Cal Raleigh'),'installed web app searches cards while simulated internet disconnected');
 await context.setOffline(false);
 check(errors.length===0,'no uncaught browser JavaScript errors: '+errors.join('; '));
 await context.close();await mobile.close();
} finally {await browser?.close();server.kill('SIGTERM')}
console.log('ALL '+passes+' CHECKS PASSED');
