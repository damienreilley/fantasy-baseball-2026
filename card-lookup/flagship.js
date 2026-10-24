(()=>{'use strict';
const $=id=>document.getElementById(id);
const h=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const LABEL={series1:'Series 1',series2:'Series 2',update26:'Update'};
const data={}, refs={}, keys=['series1','series2','update26'];
let selected=null, matches=[];
const V=[];
function add(name,n,finish,sets,color,clue){V.push({name,n,finish,sets:sets||'*',color:color||'',clue:clue||''});}
add('Regular base',null,'plain','*','','Plain flagship design; no serial number or special finish (compare with the base photograph).');
add('First Card',1,'plain','*','','Special 1/1 First Card issue: check the exact printed designation, not just the card design.');
add('Gold',2026,'plain','*','Gold','Gold-colored border; the front is not a full rainbow/holo foil finish.');
add('Independence Day',76,'texture','*','','American flag/patriotic pattern around the border.');
add('75 Years of Topps',75,'texture','*','','A special 75th-anniversary design; compare the actual border.');
add('Black Border',75,'plain','*','Black','A solid black-colored flagship border (not Black Holo or Black Rainbow).');
add('Canvas',50,'texture','*','','Canvas-like textured appearance.');
add('Memorial Day Camo',25,'texture','*','','Camouflage pattern.');
add('Wood',25,'texture','*','','Wood-grain pattern.');
add('Vintage Stock',99,'photo','*','','Different old-stock appearance; check back logo/cardstock too.');
add('Clear Variation',10,'photo','*','','Translucent/clear card (not a standard paper card).');
add('Team Color Border Variation',null,'plain','*','','Colored border based on the team, often without a serial stamp.');
add('True Photo Variation',null,'photo','*','','Photograph extends through much of the usual decorative frame.');
add('Rainbow Foil',null,'rainbow','*','','Reflective, shifting rainbow foil pattern; typically no serial stamp.');
add('Holo Foil',null,'holo','*','','Smooth holographic foil finish; typically retail.');
add('Aqua Rainbow Foil',null,'rainbow','*','Aqua','Aqua/turquoise rainbow foil.');
add('Aqua Holo Foil',null,'holo','*','Aqua','Aqua/turquoise holographic foil.');
add('Pink Holo Foil',null,'holo','*','Pink','Retail-specific foil; unnumbered.');
add('Diamante Foil',null,'diamante','*','','Repeated diamond/gem pattern; hanger-exclusive.');
add('Pink Diamante Foil',null,'diamante','*','Pink','Pink-tinted diamond-pattern foil; hanger-exclusive.');
add('Sandglitter',null,'sandglitter','*','','Fine sandy sparkle; Jumbo-exclusive.');
add('Silver Crackle Foilboard',null,'texture','*','','Silver crackled pattern; Super Box.');
add('Topps Foil Pattern',null,'topps','*','','Repeating Topps logo/pattern; Fanatics exclusive.');
for(const d of [['Yellow',399,'series1,series2'],['Purple',250,'*'],['Blue',150,'*'],['Green',99,'*'],['Gold',50,'*'],['Orange',25,'*'],['Black',10,'*'],['Red',5,'*']]){
const color=d[0],n=d[1],sets=d[2];
add(color+' Rainbow Foil',n,'rainbow',sets,color,'Rainbow-reflective surface with '+color.toLowerCase()+' tint (Hobby/Jumbo family).');
add(color+' Holo Foil',n,'holo',sets,color,'Holographic surface with '+color.toLowerCase()+' tint (retail family).');
}
add('Foilfractor',1,'rainbow','*','','Highly patterned 1/1 foil (Hobby family).');
add('Rose Gold Holo Foil',1,'holo','*','Gold','Rose-gold retail 1/1; verify exact finish.');
add('Printing Plate',1,'photo','*','','Metal printing plate, not a normal paper trading card.');
add('Green Diamante Foil',99,'diamante','*','Green','Gem pattern with green tint; hanger packs.');
for(const a of [['Gold',50],['Orange',25],['Black',10],['Red',5]]) {
add(a[0]+' Diamante Foil',a[1],'diamante','*',a[0],'Diamond/gem foil; hanger packs.');
add(a[0]+' Sandglitter',a[1],'sandglitter','*',a[0],'Fine glitter/sandy finish; Jumbo packs.');
}
add('Cherry Blossom',99,'texture','*','','Japan-exclusive cherry-blossom motif.');
add('Spring Training',null,'texture','series1','','Value-box-exclusive Spring Training design.');
for(const a of [['Green',99],['Gold',50],['Orange',25],['Black',10],['Red',5]]){
add(a[0]+' Spring Training',a[1],'texture','series1',a[0],'Special Spring Training pattern from Series 1 value boxes.');
}
add('Pink Confetti',null,'confetti','series1','Pink','Series 1 Celebration Mega confetti pattern.');
add('Confetti',null,'confetti','series1','','Series 1 Celebration Mega confetti pattern.');
add('Opening Day Foil',null,'confetti','series1','','Opening Day treatment in Celebration Mega.');
add('Silver Crackleboard Foil',null,'texture','series1,series2','','Crackleboard-style Super Box design.');
add('Tinsel Foil',null,'texture','series2','','Meijer-exclusive Tinsel treatment.');
add('All-Star Game Logo Foil',null,'asg','series2','','Repeated diagonal 2026 Philadelphia All-Star Game logos; only special ASG Mega version.');
for(const a of [['Green',99],['Gold',50],['Orange',25],['Black',10],['Red',5],['Platinum',1]]){
add('All-Star Game '+a[0],a[1],'asg','series2',a[0],'Repeated diagonal 2026 All-Star Game logos; special Philadelphia All-Star Mega.');
}
add('1991 Topps All-Star Game Foil',null,'asg91','series2','','Only 1991 Topps insert cards 91B2/91AS, repeating All-Star logo treatment.');
for(const a of [['Gold',50],['Orange',25],['Black',10],['Red',5],['Platinum',1]]){
add('1991 All-Star Game '+a[0],a[1],'asg91','series2',a[0],'ASG logo foil on a 1991 Topps insert (91B2/91AS).');
}
function seriesFor(c){return LABEL[c.release]||''}
function hideIdentify(){selected=null;$('identify').hidden=true;}
function setPicked(item){selected=item;const c=item.c,base=c.type==='Base';$('identify').hidden=false;
$('picked').className='picked';$('picked').innerHTML='<strong>'+h(c.name)+'</strong><span>#'+h(c.code)+' · '+h(seriesFor(item))+'</span><span class="badge '+(base?'base':(c.type==='Insert'?'insert':'hit'))+'">'+h(c.type.toUpperCase())+'</span>'+(c.rookie?'<span class="badge hit">RC ROOKIE</span>':'')+'<span>'+h(c.set)+'</span>';
const key=item.release;const p=refs[key]||{};$('basephoto').src=p.image||'media/base-cards/'+key+'.jpg';$('basephoto').alt='Real regular base example for '+LABEL[key];$('photosource').href=p.source||'#';
$('serial').value='';$('checked').checked=false;$('finish').value='';$('color').value='';diagnose();$('identify').scrollIntoView({block:'start',behavior:'smooth'});}
function resultBadge(c){return c.type==='Base'?'base':(c.type==='Insert'?'insert':'hit')}
function searching(){const q=norm($('cardsearch').value).replace(/^#/,'');const ed=$('edition').value;const out=$('searchresults');if(!q){hideIdentify();out.innerHTML='<div class="empty">Start by typing a number. You can also try the example below.</div>';return;}
matches=[];for(const k of keys){if(ed!=='auto'&&ed!==k)continue;const d=data[k];if(!d)continue;for(const c of d.cards){const code=norm(c.code).replace(/^#/,'');const exact=code===q;const found=exact||norm(c.name).includes(q);if(found)matches.push({c,release:k,exact});}}
matches.sort((a,b)=>Number(b.exact)-Number(a.exact)||(a.c.type==='Base'?-1:1)-(b.c.type==='Base'?-1:1));
const shown=matches.slice(0,25);let str='<p class="helper"><strong>'+matches.length+' checklist match'+(matches.length===1?'':'es')+'</strong>'+(matches.length>25?' · first 25 shown; type more to narrow':'')+'.</p>';
if(!matches.length)str+='<div class="notice">No card found in the indexed checklists. Double-check the printed number or try the player name. An unlisted card may still be valuable.</div>';
shown.forEach((it,i)=>{const c=it.c;str+='<div class="matchrow"><div><b>'+h(c.name)+'</b> <span class="badge '+resultBadge(c)+'">'+h(c.type)+'</span>'+(c.rookie?'<span class="badge hit">RC</span>':'')+'<p>#'+h(c.code)+' · '+h(seriesFor(it))+' · '+h(c.set)+'</p></div><button type="button" class="pick" data-pick="'+i+'">Identify →</button></div>';});
out.innerHTML=str;out.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>setPicked(shown[+b.dataset.pick])));
if(matches.length===1 && !selected){setPicked(matches[0]);}else if(selected && !matches.some(m=>m.c.code===selected.c.code&&m.release===selected.release&&m.c.set===selected.c.set)){hideIdentify();}
}
function readDenom(){const raw=$('serial').value.trim();if(!raw)return {n:null,raw:'',invalid:false};
const m=raw.match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
if(m){const a=+m[1],d=+m[2];return {n:d,raw,invalid:!d||a>d||a===0};}
if(/^\d+$/.test(raw)){const n=+raw;return {n,raw,invalid:n===0||n>3000};}
return {n:null,raw,invalid:true};}
function colorValid(v,obs){if(!obs)return true;return v.color===obs||v.name==='Team Color Border Variation';}
function cardAllowsASG(){if(!selected||selected.release!=='series2')return false;return selected.c.type==='Base'||/^91(B2|AS)-/i.test(selected.c.code);}
function diagnose(){const area=$('diagnosis');if(!selected){area.innerHTML='';return;}const item=selected,c=item.c,serial=readDenom(),unknown=$('checked').checked,finish=$('finish').value,color=$('color').value;
if(serial.invalid){area.innerHTML='<h3>⚠️ Check that stamp</h3><p>Enter <strong>09/25</strong>, or just <strong>25</strong> if you only know the denominator. The first number cannot exceed the second.</p>';return;}
if(c.type!=='Base'&&!cardAllowsASG()){
area.innerHTML='<h3>✅ '+h(c.type)+' — not a normal base card</h3><p><b>'+h(c.set)+'</b>. You have identified the checklist family. Its parallels follow their <b>own</b> numbering/colors — the base-card rainbow below does not apply.</p><p>Inspect the autograph/relic and stamp if present; use the specific official checklist or <a href="packs.html?set='+item.release+'&q='+encodeURIComponent(c.code)+'">full product lookup ↗</a>. Exact variant <b>not established</b> from the card code alone.</p>';return;}
if(!serial.raw&&!finish&&!unknown){area.innerHTML='<h3>One more visual clue needed</h3><p>The checklist identifies <b>'+h(c.name)+' #'+h(c.code)+'</b> as '+h(c.type)+' in '+h(seriesFor(item))+'. To decide <b>base versus parallel</b>, check its serial stamp, shine or repeating pattern and select what you see above.</p>';return;}
if(unknown&&serial.raw){area.innerHTML='<h3>These answers conflict</h3><p>Uncheck “no serial number” or clear the stamp first.</p>';return;}
if(unknown&&finish==='plain'&&!color&&c.type==='Base'){
area.innerHTML='<h3>🟢 Probably the regular BASE card</h3><p>You found <b>'+h(c.name)+' #'+h(c.code)+'</b> in '+h(seriesFor(item))+', checked both sides and observed the ordinary base design.</p><p><b>Important:</b> Unnumbered Team Color Border, photo variations and some special short prints can mimic a base card. Compare the actual photograph and borders before calling this final.</p>';return;}
let want=finish==='asg'?'asg':finish;
const asg1991=c.type==='Insert'&&cardAllowsASG();
let candidates=V.filter(v=>v.sets==='*'||v.sets.split(',').includes(item.release));
if(!cardAllowsASG())candidates=candidates.filter(v=>v.finish!=='asg'&&v.finish!=='asg91');
if(asg1991)candidates=candidates.filter(v=>v.finish==='asg91');
else if(c.type==='Base')candidates=candidates.filter(v=>v.finish!=='asg91');
if(serial.n!==null)candidates=candidates.filter(v=>v.n===serial.n);
else if(unknown)candidates=candidates.filter(v=>v.n===null);
if(want)candidates=candidates.filter(v=>want==='asg'&&(asg1991)?v.finish==='asg91':v.finish===want);
if(color)candidates=candidates.filter(v=>colorValid(v,color));
if(!candidates.length){area.innerHTML='<h3>⚠️ No confident match</h3><p>The combination you entered does not match a documented option in this base-parallel reference. Recheck the stamp, color and surface. This can also be a <b>special insert parallel or variation outside the base list</b>.</p><p><a target="_blank" rel="noopener" href="'+(item.release==='series1'?'https://www.beckett.com/news/2026-topps-series-1-baseball-parallel-guide-and-image-gallery/':item.release==='series2'?'https://www.beckett.com/news/2026-topps-series-2-baseball-parallel-guide-and-image-gallery/':'https://www.topps.com/pages/topps-updates-baseball')+'">Compare real photographed examples ↗</a></p>';return;}
const narrow=!!(serial.n!==null&&finish&&candidates.length===1)||!!(finish==='asg'&&unknown&&candidates.length===1);
let head=narrow?'<h3>🟢 Strong match — verify visually</h3>':'<h3>🔎 '+candidates.length+' possible version'+(candidates.length===1?'':'s')+'</h3>';
let intro='<p>'+(!serial.raw&&unknown?'No printed serial stamp found. ':serial.n!=null?'Serial denominator <b>/'+serial.n+'</b>. ':'')+(finish?'Observed surface: <b>'+h($('finish').selectedOptions[0].textContent)+'</b>. ':'')+(color?'Color: <b>'+h(color)+'</b>. ':'')+'These are <b>documented candidates</b> matching your clues.</p>';
const limited=candidates.slice(0,18);let rows=limited.map(v=>'<div class="guess"><strong>'+h(v.name)+(v.n===null?' <span class="badge">not serial-numbered</span>':' <span class="badge">/'+v.n+'</span>')+'</strong><small>'+h(v.clue)+'</small></div>').join('');
if(candidates.length>18)rows+='<p>Showing 18 of '+candidates.length+'. Add a surface type or color above to narrow the list.</p>';
let note='<p class="helper">'+(narrow?'This identifies the parallel family <b>conditional on your visual observation</b>; the app has not inspected the physical card.':'Number alone cannot distinguish these versions. Change the surface dropdown or use the linked photos.')+'</p>';
if(finish==='asg')note+='<p><a href="https://www.beckett.com/news/2026-topps-all-star-game-mega-box-baseball-cards/" target="_blank" rel="noopener">Compare actual All-Star logo foil photos ↗</a></p>';
area.innerHTML=head+intro+rows+note;}
function setDemo(){$('cardsearch').value='557';$('edition').value='auto';hideIdentify();searching();let found=matches.find(m=>m.release==='series2'&&m.c.type==='Base'&&m.c.code==='557');if(found)setPicked(found);$('serial').value='09/25';$('finish').value='asg';$('color').value='Orange';diagnose();}
$('cardsearch').addEventListener('input',()=>{hideIdentify();searching()});$('edition').addEventListener('change',()=>{hideIdentify();searching()});$('clearsearch').addEventListener('click',()=>{$('cardsearch').value='';hideIdentify();searching();$('cardsearch').focus()});
for(const id of ['serial','checked','finish','color'])$(id).addEventListener(id==='serial'?'input':'change',()=>{if(id==='serial'&&$('serial').value)$('checked').checked=false; if(id==='checked'&&$('checked').checked)$('serial').value='';diagnose();});
$('example').addEventListener('click',setDemo);
Promise.all([Promise.all(keys.map(k=>fetch('data/'+k+'.json').then(r=>{if(!r.ok)throw Error(k+' HTTP '+r.status);return r.json()}).then(d=>{data[k]=d;}))),fetch('media/base-cards/base-examples.json').then(r=>r.ok?r.json():{}).catch(()=>({}))]).then(a=>{Object.assign(refs,a[1]);$('status').textContent='✅ 1,050 base-card entries cross-checked against Topps; inserts, autographs and relics also searchable. Browse by card number.';$('cardsearch').disabled=false;searching();const q=new URLSearchParams(location.search).get('q');if(q){$('cardsearch').value=q;searching()}}).catch(e=>{$('status').textContent='⚠️ Checklist data did not load; check your connection and refresh.';console.error(e);});
})();