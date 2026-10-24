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
 ['series1',1700,'1','Aaron Judge'],
 ['series2',1850,'351','Dillon Dingler'],
 ['asg26',1850,'351','Dillon Dingler'],
 ['update26',2050,'US1','Konnor Griffin'],
]){
 const d=JSON.parse(await readFile(path.join(dir,'data',set+'.json'),'utf8'));
 check(d.cards.length>=min,set+' checklist has '+d.cards.length+' entries');
 check(d.cards.some(c=>c.code===code&&c.name===name),set+' known lookup '+code+' '+name);
 check(d.cards.every(c=>c.code&&c.name&&c.set&&c.type),set+' all records contain searchable fields');
}
for (const key of ['series1','series2','update26']) {const x=JSON.parse(await readFile(path.join(dir,'data',key+'.json'),'utf8'));check(x.cards.filter(c=>c.type==='Base').length===350, key+' official Topps PDF has 350 base cards');}
// Manufacturer-source audit: exact cardinality and card IDs for the three flagship releases.
for (const [set,start,prefix] of [['series1',1,''],['series2',351,''],['update26',1,'US']]) {
 const d=JSON.parse(await readFile(path.join(dir,'data',set+'.json'),'utf8'));
 const baseCards=d.cards.filter(c=>c.type==='Base');
 check(baseCards.length===350,set+' exact 350 official base entries');
 const ids=new Set(baseCards.map(c=>c.code));
 check(Array.from({length:350},(_,i)=>prefix+(i+start)).every(id=>ids.has(id)),set+' complete official base numbering without gaps');
 const subsetSet=new Set(d.cards.map(c=>c.code+'|'+c.set));
 check(subsetSet.size===d.cards.length,set+' unique printed code plus manufacturer subset (dual autos merged)');
 check(d.cards.filter(c=>c.type!=='Base').every(c=>c.provenance?.includes('Official Topps PDF')),set+' supplemental entries carry manufacturer PDF provenance');
}
const update=JSON.parse(await readFile(path.join(dir,'data/update26.json'),'utf8'));
check(update.cards.some(c=>c.code==='AA-21' && c.name==='Trey Yesavage' && c.set==='AUTUMN ASCENSIONS'),'Update AA-21 Autumn Ascensions identified without confusion');
check(update.cards.some(c=>c.code==='AA-21' && c.name==='Andrew Painter' && c.set==='ALL ACES'),'Update AA-21 All Aces independently identified');
check(update.cards.some(c=>c.code==='U91C-1' && c.type==='Insert' && c.set==='1991 TOPPS BASEBALL CHROME BASE CARDS'),'Update U91C-1 regular insert recognized');
check(update.cards.some(c=>c.code==='U91C-1' && c.type==='Autograph' && c.set==='1991 TOPPS BASEBALL CHROME BASE CARDS AUTOGRAPH PARALLEL'),'Update U91C-1 autograph separately recognized');
const swCode=await readFile(path.join(dir,'sw.js'),'utf8');
check(swCode.includes("live=await fetch(req") && swCode.includes("cache.match(req"),'offline service worker refreshes newest checklist online and falls back offline');

const asg=JSON.parse(await readFile(path.join(dir,'data/asg26.json'),'utf8'));check(asg.asgMega===true,'All-Star Game Mega is distinct product');check(asg.cards.filter(c=>c.asgParallelFamily==='2026 All-Star Game Base Foil').length===350,'All-Star exclusive foil base checklist contains 350 eligible entries');check(asg.cards.filter(c=>c.asgParallelFamily==='1991 Topps Baseball All-Star Game Foil').length===50,'All-Star 1991 Topps Baseball foil has 50 eligible entries');check(asg.cards.filter(c=>c.asgParallelFamily==='1991 Topps All-Star Game Foil').length===50,'All-Star 1991 Topps All-Star foil has 50 eligible entries');check(asg.cards.filter(c=>c.code==='91B2-3'&&c.name==='Trea Turner'&&c.asgParallelFamily),'Trea Turner 1991 ASG variant found');check(asg.cards.filter(c=>c.code==='91AS-3'&&c.name==='Kyle Schwarber'&&c.asgParallelFamily),'Kyle Schwarber 1991 ASG variant found');
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
// Public, internet-accessible production check, separate from local file tests.
const production='https://damienreilley.github.io/fantasy-baseball-2026/card-lookup/';
for(const [asset,textExpected] of [
 ['','PACK ROOM'],
 ['packs.html','main.js'],
 ['config.js','window.PRODUCTS'],
 ['main.js','showResults'],
 ['data/chrome25.json','Cal Raleigh'],
 ['data/pulse26.json','Aidan Miller'],
 ['data/panini26.json','AJ Elliott'],
 ['data/logo26.json','Bryce Harper'],
 ['Pack_Room_Offline_All_Four.html','All 4 Offline Card Lookup Tools'],
 ['Pack_Room_Offline_All_Seven.html','All 7 Offline Card Lookup Tools'],
 ['Pack_Room_Offline_All_Eight.html','All 8 Offline Card Lookup Tools'],
 ['data/asg26.json','Dillon Dingler'],
 ['education.html','CHEAT SHEETS + VISUAL PARALLELS'],
 ['media/update-parallels.png',''],
 ['media/update-education.pdf',''],
 ['data/series1.json','Aaron Judge'],
 ['data/series2.json','Dillon Dingler'],
 ['data/update26.json','Konnor Griffin'],
]){
 const res=await fetch(production+asset,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Mozilla/5.0 PackRoom QA'}});
 check(res.status===200,'PUBLIC GitHub Pages '+(asset||'homepage')+' returns HTTP 200');
 const body=await res.text();
 check(body.includes(textExpected),'PUBLIC asset '+(asset||'homepage')+' serves expected content');
}

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
 check(await page.locator('a.product').count()===8,'homepage shows eight selectable exact products');
 const baseReferences=JSON.parse(await readFile(path.join(dir,'media/base-cards/base-examples.json'),'utf8'));
 for(const k of ['chrome25','pulse26','panini26','logo26','series1','asg26','series2','update26']){
   const pic=baseReferences[k];
   check(Boolean(pic&&pic.label&&pic.status&&pic.source&&pic.image),k+' documented base-card image and attribution');
   check((await stat(path.join(dir,pic.image))).size>9000,k+' image is a real locally hosted file');
 }
 await page.waitForFunction(()=>document.querySelectorAll('.product-base-thumb').length===8,null,{timeout:15000});
 check(await page.locator('.product-base-thumb').count()===8,'all eight product cards show a base-card thumbnail');
 await page.goto(base+'base-gallery.html',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>document.querySelectorAll('.ref').length===8,null,{timeout:15000});
 check(await page.locator('.ref').count()===8,'base-card comparison gallery shows eight products');
 check((await page.locator('.ref img').count())===8,'all eight gallery entries have an actual image');
 for(const key of ['series1','series2','update26','logo26','pulse26','panini26','chrome25','asg26']){
   const ref=baseReferences[key];
   check((await page.locator('.ref').allTextContents()).some(s=>s.includes(ref.label)),'comparison gallery identifies '+key);
 }

 for(const k of ['chrome25','pulse26','panini26','logo26','series1','asg26','series2','update26']){
   await page.goto(base+'packs.html?set='+k,{waitUntil:'networkidle'});
   await page.locator('#base-example img').waitFor({timeout:12000});
   const goodImage=await page.locator('#base-example img').evaluate(img=>img.complete&&img.naturalWidth>=150);
   check(goodImage,k+' lookup displays readable local base-card image');
   check((await page.locator('#base-example').innerText()).includes(baseReferences[k].label),k+' image is labeled correctly');
   check((await page.locator('#base-example a[href^="http"]').count())>0,k+' exposes image attribution link');
   await page.goto(base+'education.html?set='+k,{waitUntil:'networkidle'});
   await page.locator('#base-education-content img').waitFor({timeout:15000});
   check((await page.locator('#base-education-content').innerText()).includes(baseReferences[k].label),k+' cheat sheet includes same base-card reference');
 }

 check((await readFile(path.join(dir,'packs.html'),'utf8')).includes('ALL EIGHT PRODUCTS'),'card lookup navigation names eight products accurately');
 check((await readFile('.github/workflows/build-pack-lookups.yml','utf8')).includes('git add card-lookup/data/*.json card-lookup/Pack_Room_Offline_All_Eight.html'),'lookup rebuild publishes current eight-product offline file');

 const examples=[
  ['chrome25','USC45','Cal Raleigh'],
  ['pulse26','BLCL-01','Aidan Miller'],
  ['panini26','AJ Elliott','AJ Elliott'],
  ['logo26','244','Bryce Harper'],
  ['series1','1','Aaron Judge'],
  ['series2','351','Dillon Dingler'],
  ['asg26','91B2-3','Trea Turner'],
  ['update26','US1','Konnor Griffin'],
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
 for (const k of ['series1','series2','asg26','update26','logo26','chrome25','pulse26','panini26']) {await page.goto(base+'education.html?set='+k,{waitUntil:'networkidle'});check(await page.locator('#heading').innerText()!=='' ,'education cheat sheet renders for '+k);check(await page.locator('#parallelWarning').innerText()!=='' ,'parallel guidance displays for '+k);}
 await page.goto(base+'education.html?set=update26',{waitUntil:'networkidle'});check(await page.locator('#visualEmbed img.e-visual').count()===1,'Update official parallel image embedded');check(await page.locator('#visualEmbed img').evaluate(el=>el.complete&&el.naturalWidth>500),'Update visual actually rendered and legible at resolution');const pdfResp=await fetch(base+'media/update-education.pdf');check(pdfResp.status===200,'Update printable education PDF accessible');
 await page.goto(base+'packs.html?set=asg26',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('#load-status')?.textContent?.includes('✅'));await page.locator('#lookup').fill('372');check((await page.locator('#results').innerText()).includes('All-Star foil version exists'),'ASG card lookup explicitly explains possible ASG variant versus regular Series 2');await page.goto(base+'education.html?set=asg26',{waitUntil:'domcontentloaded'});check((await page.locator('#parallelGrid').innerText()).includes('Platinum ASG'),'ASG parallel visual lists Platinum 1/1');check((await page.locator('#parallelGrid').innerText()).includes('1991'),'ASG insert parallel ladder is separate from base');
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
 const off7=new URL('file://'+path.join(dir,'Pack_Room_Offline_All_Seven.html')).href;
 const seven=await browser.newPage();await seven.goto(off7);await seven.locator('#set').selectOption('update26');await seven.locator('#q').fill('US1');check((await seven.locator('#matches').innerText()).includes('Konnor Griffin'),'standalone 7-product offline file resolves Update rookie');await seven.close();

 const eight=await browser.newPage();await eight.goto(new URL('file://'+path.join(dir,'Pack_Room_Offline_All_Eight.html')).href);await eight.locator('#set').selectOption('asg26');await eight.locator('#q').fill('91B2-3');check((await eight.locator('#matches').innerText()).includes('Trea Turner'),'All-Star Mega lookup works in self-contained eight-product offline file');await eight.close();
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
