const VERSION='pack-room-2026-v15-pulse';
const STATIC=['./pulse.html','./pulse.css','./pulse.js','./flagship-v2.html','./flagship-v2.js','./flagship-v2.css','./flagship.html','./flagship.js','./flagship.css','./','./index.html','./packs.html','./education.html','./base-gallery.html','./base-examples-education.js','./media/base-cards/base-examples.json','./media/base-cards/series1.jpg','./media/base-cards/series2.jpg','./media/base-cards/update26.jpg','./media/base-cards/chrome25.jpg','./media/base-cards/logo26.jpg','./media/base-cards/pulse26.jpg','./media/base-cards/panini26.jpg','./media/base-cards/stadium25.jpg','./style.css','./config.js','./main.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./media/update-parallels.png','./media/update-education.pdf','./media/buyers-chase-terms.jpg','./media/presentation-chase-decoder.jpg','./data/series1.json','./data/series2.json','./data/asg26.json','./data/update26.json','./data/logo26.json','./data/chrome25.json','./data/pulse26.json','./data/panini26.json','./data/stadium25.json','./Pack_Room_Offline_All_Nine.html'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(VERSION);
 await Promise.all(STATIC.map(async url=>{
  try{await cache.add(new Request(url,{cache:'reload'}))}
  catch(error){console.warn('Not cached yet:',url,error)}
 }));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('pack-room-')&&k!==VERSION).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==location.origin||!url.pathname.includes('/card-lookup/'))return;
 event.respondWith((async()=>{
  const cache=await caches.open(VERSION);
  try {
   // Network first: changes to manufacturer checklists and identification guides
   // must not be hidden behind an old cache when the device is online.
   const controller=new AbortController();
   const timer=setTimeout(()=>controller.abort(),4000);
   let live;
   try{live=await fetch(req,{signal:controller.signal})}finally{clearTimeout(timer)}
   if(live.ok){const clone=live.clone();event.waitUntil(cache.put(req,clone));return live}
   const saved=await cache.match(req,{ignoreSearch:true});return saved||live;
  }catch(error){
   const saved=await cache.match(req,{ignoreSearch:true});
   if(saved)return saved;
   if(req.mode==='navigate')return (await cache.match('./index.html'))||Response.error();
   return Response.error();
  }
 })());
});
