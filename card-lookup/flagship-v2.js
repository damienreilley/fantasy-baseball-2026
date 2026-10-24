(()=>{'use strict';
const $=id=>document.getElementById(id),safe=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),N=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),L={series1:'Series 1',series2:'Series 2',update26:'Update'};
const SOURCE={series1:'https://www.topps.com/pages/series-1',series2:'https://www.topps.com/pages/series-2',update26:'https://www.topps.com/pages/topps-updates-baseball',asg26:'https://www.checklistinsider.com/2026-topps-all-star-game-mega-box-baseball'};
const DATA={},refs={};let set='all',picked=null,finish='',searchHits=[],flag=null;
const photoRefs=[
{name:'Series 1 — ordinary BASE',detail:'Actual Aaron Judge #1; compare layout',src:'media/base-cards/series1.jpg',credit:'https://www.ebay.com/itm/168171292721',tag:'base'},
{name:'Series 2 — ordinary BASE',detail:'Actual Leo Rivas #649; same flagship layout',src:'media/base-cards/series2.jpg',credit:'https://www.sportscardspro.com/game/baseball-cards-2026-topps-series-2/leo-rivas-649',tag:'base'},
{name:'Update — base design',detail:'Promotional example; US-numbered checklist',src:'media/base-cards/update26.jpg',credit:'https://www.topps.com/pages/topps-updates-baseball',tag:'base'},
{name:'HOLO FOIL',detail:'Series 1 · Logan Gilbert example',src:'https://i.ebayimg.com/images/g/m~MAAeSwQ5pp3Yrq/s-l1200.jpg',credit:'https://www.ebay.com/itm/178046967529',tag:'holo'},
{name:'RAINBOW FOIL',detail:'Series 1 · Adam Frazier example',src:'https://i.ebayimg.com/images/g/ST0AAeSwmc1p79Vy/s-l960.jpg',credit:'https://www.ebay.com/itm/147280943332',tag:'rainbow'},
{name:'AQUA RAINBOW',detail:'Series 1 · José Altuve example',src:'https://i.ebayimg.com/images/g/1zoAAeSw5D5p3YQy/s-l1600.png',credit:'https://www.ebay.com/p/6091977035',tag:'rainbow'},
{name:'GREEN HOLO',detail:'Series 1 · Cal Raleigh example; patterned foil',src:'https://storage.googleapis.com/images.pricecharting.com/corrcdzrdj6cy2ehcvb6/1600.jpg',credit:'https://www.sportscardspro.com/game/baseball-cards-2026-topps/cal-raleigh-green-holo-140',tag:'holo'},
{name:'DIAMANTE FOIL',detail:'Series 2 · Kazuma Okamoto; gem/triangle pattern',src:'https://i.ebayimg.com/images/g/ZdwAAeSwGGJqStZF/s-l1600.jpg',credit:'https://www.sportscardinvestor.com/cards/kazuma-okamoto-baseball/2026-topps-series-2-diamante-foil-443',tag:'diamante'},
{name:'ORANGE DIAMANTE /25',detail:'Phillies · Trea Turner; ORANGE + gem pattern',src:'https://i.ebayimg.com/images/g/pcAAAeSwDDJpsaQL/s-l1200.jpg',credit:'https://www.ebay.com/itm/127733729676',tag:'diamante'},
{name:'BLACK BORDER /75',detail:'Series 1 · Jacob Misiorowski',src:'https://storage.googleapis.com/images.pricecharting.com/corryjjxbt5fr6aoc7u6/1600.jpg',credit:'https://www.sportscardspro.com/game/baseball-cards-2026-topps/jacob-misiorowski-black-border-10',tag:'plain'},
{name:'WOOD /25',detail:'Series 1 · Roman Anthony actual wood border',src:'https://i.ebayimg.com/images/g/NmwAAeSwd0lpl1qP/s-l1600.jpg',credit:'https://www.sportscardinvestor.com/cards/roman-anthony-baseball/2026-topps-wood-260',tag:'texture'},
{name:'SILVER CRACKLE FOIL',detail:'Series 1 · Geraldo Perdomo',src:'https://storage.googleapis.com/images.pricecharting.com/corrss2m2sw77e35ch62/1600.jpg',credit:'https://www.sportscardspro.com/game/baseball-cards-2026-topps/geraldo-perdomo-silver-crackleboard-257',tag:'texture'},
{name:'PHILLY ALL-STAR GAME FOIL',detail:'Real 2026 ASG parallel design · repeated ALL-STAR logos (promotional example, unnumbered)',src:'https://xcdn.checklistinsider.com/public/2026/07/2026-Topps-All-Star-Game-Mega-Box-Baseball-Base-ASG-Parallel-Munetaka-Murakami-RC.jpeg',credit:'https://www.checklistinsider.com/2026-topps-all-star-game-mega-box-baseball',tag:'asg'},
{name:'Topps Update visual guide',detail:'Original multi-card color examples (Topps education sheet)',src:'media/update-parallels.png',credit:'media/update-education.pdf',tag:'texture'}
];
const ALL=['Hobby','Jumbo','Value','Mega','Hanger','Fat','Super','Fanatics','Celebration','ASG','Japan'];
const main=['Hobby','Jumbo','Value','Mega','Hanger','Fat','Super','Fanatics','Japan'];
const retail=['Value','Mega','Hanger','Fat','Super','Fanatics'];
const hobby=['Hobby','Jumbo'];
const anyOf=x=>x||main;
const R=[];
function add(name,n,kind,sets,formats,description='',photo='',odds={}){R.push({name,n,kind,sets:sets||['series1','series2','update26'],formats:anyOf(formats),description,photo,odds})}
const three=['series1','series2','update26'],ss=['series1','series2'];
add('Regular base (standard)',null,'plain',three,main,'Normal printed card; NOT a parallel.');
add('Rainbow Foil',null,'rainbow',three,main,'Shifting rainbow light; not serial numbered.','', {series1:{Hobby:'1:11',Jumbo:'1:3',Mega:'1:10',Hanger:'1:3'},series2:{Hobby:'1:11',Jumbo:'1:2',Value:'1:11',Mega:'1:10',Hanger:'1:2'}});
add('Holo Foil',null,'holo',three,retail,'Reflective retail foil distinct from Rainbow Foil.','', {series1:{Value:'1:11',Mega:'1:10',Hanger:'1:3'},series2:{Value:'1:11',Mega:'1:10',Hanger:'1:4'}});
add('Diamante Foil',null,'diamante',three,['Hanger'],'Faceted diamond / gem background, hanger format.');
add('Pink Diamante Foil',null,'diamante',three,['Hanger'],'Pink hue with faceted diamond texture.');
add('Sandglitter',null,'sand',three,['Jumbo'],'Very fine dense glitter surface.');
add('Silver Crackle Foilboard',null,'texture',three,['Super'],'Silver shattered / crackled reflective appearance.');
add('Topps Logo Foil Pattern',null,'topps',three,['Fanatics'],'Repeating Topps-logo finish.');
add('Aqua Rainbow Foil',null,'rainbow',three,main,'Aqua-tinted rainbow foil.');
add('Aqua Holo Foil',null,'holo',three,retail,'Aqua/turquoise tinted holo foil.');
add('Pink Holo Foil (limited, UNNUMBERED)',null,'holo',three,retail,'Print run can be published without a visible serial stamp. Do not claim /800 is printed on the card.');
add('Gold Border',2026,'plain',three,main,'Gold border on regular flagship cardstock.');
for(const [color,n] of [['Yellow',399],['Purple',250],['Blue',150],['Green',99],['Gold',50],['Orange',25],['Black',10],['Red',5]]){
const support=color==='Yellow'?ss:three;
add(color+' Rainbow Foil',n,'rainbow',support,hobby,'Rainbow foil + '+color.toLowerCase()+' color; Hobby/Jumbo family.');
add(color+' Holo Foil',n,'holo',support,retail,'Holo foil + '+color.toLowerCase()+' color; retail family.');
}
for(const [color,n] of [['Green',99],['Gold',50],['Orange',25],['Black',10],['Red',5]]){
add(color+' Diamante Foil',n,'diamante',three,['Hanger'],'Colorized faceted diamond foil; Hanger.');
}
for(const [color,n] of [['Gold',50],['Orange',25],['Black',10],['Red',5]]){
add(color+' Sandglitter',n,'sand',three,['Jumbo'],'Colorized glitter foil; Jumbo.');
}
add('Independence Day',76,'texture',three,main,'Patriotic border / USA-style treatment.');
add('75 Years of Topps',75,'texture',three,main,'Special 75-year motif; NOT the scratch-off prize redemption.');
add('Black Border',75,'plain',three,main,'Black solid border rather than Black Holo /10.');
add('Canvas',50,'texture',three,main,'Textured/art-canvas surface.');
add('Memorial Day Camo',25,'texture',three,main,'Camouflage treatment.');
add('Wood',25,'texture',three,main,'Visible wood-grain border / surface.');
add('Cherry Blossom',99,'texture',three,['Japan'],'Japanese cherry-blossom pattern.');
add('Vintage Stock variation',99,'variation',three,main,'Different stock/old-style appearance. Eligibility limited to subset; verify player.');
add('Clear variation',10,'variation',three,['Hobby'],'Transparent stock; subset-limited, verify eligibility.');
add('Golden Mirror image variation',null,'variation',three,main,'Different player photo, gold back; very rare and unnumbered.');
add('Team Color Border variation',null,'variation',three,main,'Team-color border, may be unnumbered, subset only.');
add('True Photo variation',null,'variation',three,main,'Photo dominates / extends through standard decoration; subset only.');
add('First Card',1,'variation',three,main,'1/1 special First Card edition, if eligible.');
add('Foilfractor',1,'rainbow',three,hobby,'Hobby/Jumbo 1/1 special foil.');
add('Rose Gold Holo Foil',1,'holo',three,retail,'Retail 1/1 rose-gold holographic.');
add('Printing Plate',1,'variation',three,main,'Metal production plate; Cyan, Magenta, Yellow or Black.');
add('Spring Training',null,'texture',['series1'],['Value'],'Spring Training Arizona/Florida value-box variation.');
for(const [color,n] of [['Green',99],['Gold',50],['Orange',25],['Black',10],['Red',5],['Rose Gold',1]])add(color+' Spring Training',n,'texture',['series1'],['Value'],'Spring Training themed parallel; value box.');
add('Confetti',null,'confetti',['series1'],['Celebration'],'Celebration Mega exclusive.');
add('Opening Day Foil',null,'confetti',['series1'],['Celebration'],'Celebration Mega exclusive.');
add('Pink Confetti',null,'confetti',['series1'],['Celebration'],'Celebration Mega exclusive.');
add('Lime Green Confetti',null,'confetti',['series1'],['Celebration'],'Celebration Mega exclusive.');
add('Meijer Tinsel Foil',null,'texture',ss,['Value'],'Meijer-exclusive edition only.');
add('Big Apple Foil variation',null,'variation',['series2'],['Fanatics'],'Fanatics Fest restricted players; not an ordinary Series 2 pack.');
add('Canadian Independence Day',67,'texture',['series2'],main,'Blue Jays special variation; restricted checklist.');
add('Philly All-Star Foil',null,'asg',['asg26'],['ASG'],'REPEATING Philadelphia 2026 All-Star logos across Series 2 card.', '', {asg26:{ASG:'1:3'}});
for(const [color,n,od] of [['Green',99,'1:48'],['Gold',50,'1:94'],['Orange',25,'1:188'],['Black',10,'1:469'],['Red',5,'1:934'],['Platinum',1,'1:4,645']])add('Philly All-Star '+color,n,'asg',['asg26'],['ASG'],'REPEATING Philadelphia 2026 All-Star logos.', '',{asg26:{ASG:od}});
add('1991 Topps All-Star Foil (91B2/91AS)',null,'asg91',['asg26'],['ASG'],'1991-design insert (not Series 2 numbered base).','',{asg26:{ASG:'1:5'}});
for(const [color,n,od] of [['Gold',50,'1:328'],['Orange',25,'1:655'],['Black',10,'1:1,634'],['Red',5,'1:3,252'],['Platinum',1,'1:16,250']])add('1991 Topps All-Star '+color,n,'asg91',['asg26'],['ASG'],'1991 insert ONLY; repeating Philly logo treatment.', '',{asg26:{ASG:od}});
const F=[['plain','⬜','Plain border'],['rainbow','🌈','Rainbow foil'],['holo','✨','Holo foil'],['diamante','💎','Diamond pattern'],['sand','🪨','Sandglitter'],['asg','⭐','Philly logo'],['texture','🌳','Wood / camo / pattern'],['variation','🪞','Different photo'],['confetti','🎉','Confetti']];
function fillFinishes(){$('finishes').innerHTML=F.map(([key,emoji,label])=>'<button data-finish="'+key+'" type="button"><b>'+emoji+'</b>'+label+'</button>').join('');$('finishes').querySelectorAll('button').forEach(b=>b.onclick=()=>{finish=finish===b.dataset.finish?'':b.dataset.finish;fillFinishes();solve()});$('finishes').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.finish===finish));}
function showPhotos(){const host=$('photosGrid');host.innerHTML=photoRefs.map((p,i)=>'<div class="photocard"><a href="'+safe(p.credit)+'" target="_blank" rel="noopener"><img loading="lazy" src="'+safe(p.src)+'" alt="'+safe(p.name)+' photographed card" onerror="this.style.opacity=0.2;this.alt=\'Photo link temporarily unavailable — open original\';"><div class="photocopy"><b>'+safe(p.name)+'</b><span>'+safe(p.detail)+'</span><span>Actual example / source ↗</span></div></a></div>').join('');}
function catalog(){const s=$('catalogset').value,q=N($('rainfilter').value);const items=R.filter(v=>v.sets.includes(s)&&(N(v.name+' '+v.description+' /'+v.n).includes(q)));$('count').textContent=items.length+' documented candidate families · '+(s==='asg26'?'Philly ASG-only designs':'base-card parallels and variations')+' · Some eligibility restricted to subset / format.';$('parallels').innerHTML=items.map(v=>'<tr><td><b>'+safe(v.name)+'</b><div class="little">'+safe(v.description)+'</div></td><td>'+ (v.n===null?'not stamped':'/'+v.n)+'</td><td>'+safe(v.formats.join(', '))+'</td><td><a href="#photos">👀 Compare photos ↑</a></td></tr>').join('');}
function search(){const q=N($('q').value).replace(/^#/,'');const el=$('results');if(!q){el.innerHTML='<p class="little">Type a number and your player appears here. You can also try the example below.</p>';picked=null;$('picked').hidden=true;solve();return;}searchHits=[];for(const key of ['series1','series2','update26']){if(set!=='all'&&set!==key)continue;for(const c of DATA[key]?.cards||[]){const exact=N(c.code).replace(/^#/,'')===q;const found=exact||N(c.name).includes(q);if(found)searchHits.push({key,c,exact});}}
searchHits.sort((a,b)=>(+b.exact)-(+a.exact)||((a.c.type==='Base'?0:1)-(b.c.type==='Base'?0:1)));const max=18;
let msg='<p class="little"><b>'+searchHits.length+' checklist matches</b> '+(searchHits.length>max?'(showing first '+max+'; type more to narrow)':'')+'</p>';
if(!searchHits.length)msg+='<div class="infobox">No matching indexed card. Double-check its printed code, or check official subset/variation checklists. Scratch-off 75 Years Gifts cards are separate from player checklists.</div>';
msg+=searchHits.slice(0,max).map((item,i)=>{const c=item.c;return '<div class="match"><div><b>'+safe(c.name)+'</b><span class="chip '+(c.type==='Insert'?'insert':c.type==='Base'?'':'auto')+'">'+safe(c.type)+'</span>'+(c.rookie?'<span class="chip auto">RC</span>':'')+'<small>#'+safe(c.code)+' · '+safe(L[item.key])+' · '+safe(c.set)+'</small></div><button type="button" data-pick="'+i+'">VIEW →</button></div>';}).join('');
el.innerHTML=msg;el.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>choose(searchHits[+b.dataset.pick]));
if(searchHits.length===1&&searchHits[0].exact)choose(searchHits[0],false);
}
function category(c){if(c.type==='Base')return '<b>BASE CHECKLIST ENTRY.</b> Your physical card can be the regular base OR a parallel/photo variation with the same number. Use the color/stamp section below.';if(c.type==='Insert')return '<b>INSERT:</b> A distinct bonus card design, not the standard base card. This '+safe(c.set)+' insert may have its OWN colored or serial-numbered variants; do not apply the base-card parallel table to it.';if(c.type==='Autograph')return '<b>AUTOGRAPH checklist entry:</b> check for an actual signature or autograph redemption. A checklist entry is not proof your card has a real signature. Signature parallel tiers are unique to this insert set.';if(c.type==='Relic')return '<b>RELIC / MEMORABILIA checklist entry:</b> look for actual material inside the card. Relic and autograph-relic variants have set-specific parallel ladders.';return 'Special checklist entry. Check the physical finish and manufacturer checklist.';}
function choose(x,scroll=true){picked=x;const c=x.c,key=x.key;$('picked').hidden=false;$('who').textContent=c.name+' · #'+c.code;$('identity').innerHTML='<span class="chip '+(c.type==='Base'?'':'insert')+'">'+safe(c.type.toUpperCase())+'</span><span class="chip">'+safe(L[key])+'</span>'+(c.rookie?'<span class="chip auto">RC — ROOKIE</span>':'')+'<p class="muted">'+safe(c.set)+(c.team?' · '+safe(c.team):'')+'</p>';$('cathelp').innerHTML=category(c);
const b=refs[key]||{};$('basepic').src=b.image||'media/base-cards/'+key+'.jpg';$('basepic').alt='Regular '+L[key]+' base card example (not '+c.name+')';$('basecredit').href=b.source||SOURCE[key];$('savedstatus').textContent='';$('catalogset').value=key;catalog();solve();if(scroll)$('picked').scrollIntoView({block:'start',behavior:'smooth'});}
function serial(){const q=$('stamp').value.trim();if(!q)return {n:null,err:false,shown:false};let m=q.match(/^(\d+)\s*\/\s*(\d+)$/);if(m)return {n:+m[2],err:+m[1]<1||+m[1]>+m[2]||+m[2]===0,shown:true};if(/^\d+$/.test(q))return {n:+q,err:+q<1||+q>2026,shown:true};return{n:null,err:true,shown:true};}
function matchPhoto(v){const s=v.kind;let key=null;if(v.name==='Wood')key='WOOD /25';else if(v.name==='Black Border')key='BLACK BORDER /75';else if(v.name==='Silver Crackle Foilboard')key='SILVER CRACKLE FOIL';else if(v.name==='Diamante Foil')key='DIAMANTE FOIL';else if(v.name==='Orange Diamante Foil')key='ORANGE DIAMANTE /25';else if(v.name==='Rainbow Foil')key='RAINBOW FOIL';else if(v.name==='Aqua Rainbow Foil')key='AQUA RAINBOW';else if(v.name==='Holo Foil')key='HOLO FOIL';else if(s==='asg')key='PHILLY ALL-STAR GAME FOIL';if(!key)return '';const ex=photoRefs.find(p=>p.name===key);if(!ex)return '';return '<a href="'+safe(ex.credit)+'" target="_blank" rel="noopener" class="samplephoto"><img src="'+safe(ex.src)+'" loading="lazy" alt="Real example of '+safe(ex.name)+'" /><small>'+(s==='asg'?'ASG pattern example · color may differ':'Real sample photo')+' ↗</small></a>';}
function solve(){const box=$('identified');const s=serial(),f=$('format').value,nos=$('none').checked;if(s.err){box.innerHTML='<b>Check the serial stamp.</b> Type 09/25, or 25 for its denominator.';return}if(nos&&s.shown){box.innerHTML='<b>Contradictory clues.</b> Clear the stamp or uncheck “no serial stamp.”';return}
let active=picked?picked.key:($('catalogset').value||'series1');
const is91=!!(picked&&/^91(B2|AS)-/i.test(picked.c.code)&&active==='series2'&&f==='ASG');
if(f==='ASG'&&active==='series2')active='asg26';
let poss=R.filter(v=>((active==='asg26'&&v.sets.includes('series2')&&v.formats.includes('Mega'))||v.sets.includes(active))&&(!f||v.formats.includes(f)||(f==='ASG'&&active==='asg26'&&v.sets.includes('series2')&&v.formats.includes('Mega'))));
if(picked&&picked.c.type!=='Base'){
if(!(is91&&active==='asg26')){box.innerHTML='<b>'+safe(picked.c.type)+' → '+safe(picked.c.set)+'</b><p>Identified the checklist family, but the exact variant needs that specific <b>insert / autograph / relic</b> checklist and physical inspection. The base parallel table does not apply.</p><a href="'+safe(SOURCE[picked.key])+'" target="_blank" rel="noopener">Check the official '+safe(L[picked.key])+' checklist ↗</a>';return;}
poss=poss.filter(v=>v.kind==='asg91');
}else if(active==='asg26'&&finish==='asg')poss=poss.filter(v=>v.kind==='asg');else if(active==='asg26'&&finish!=='asg')poss=poss.filter(v=>v.kind!=='asg91');
if(s.shown)poss=poss.filter(v=>v.n===s.n);else if(nos)poss=poss.filter(v=>v.n===null);
if(finish){poss=poss.filter(v=>v.kind===finish||(finish==='texture'&&['sand'].includes(v.kind))||(finish==='asg'&&v.kind==='asg91'));}
if(!s.shown&&!nos&&!finish){box.innerHTML='<b>Ready when you are.</b><p>Tap a visual finish, enter a stamp, or choose the box type. Matches update instantly.</p>';return}
if(nos&&finish==='plain'&&picked&&picked.c.type==='Base'&&!f){box.innerHTML='<b>LIKELY ORDINARY BASE.</b><p>No serial stamp + standard design + a matching base checklist entry. Double-check against the photograph and Golden Mirror / photo variations.</p>';return}
if(!poss.length){box.innerHTML='<b>No responsible match yet.</b><p>Those clues do not match the base family reference for '+safe(L[picked?.key]||active)+'. Check if this is an insert, special variation, or a different box format. Try clearing the finish or format.</p>';return}
const note=picked?('<p>For <b>'+safe(picked.c.name)+' #'+safe(picked.c.code)+'</b> ('+safe(L[picked.key])+'):</p>'):'<p>No card selected — these are possible base-parallel families matching your clues.</p>';
let txt=note+'<h3>'+poss.length+' POSSIBLE VERSION'+(poss.length===1?'':'S')+'</h3>';
txt+=poss.slice(0,16).map(v=>'<div class="possible"><b>'+safe(v.name)+' · '+(v.n===null?'no serial stamp':'/'+v.n)+'</b><small>'+safe(v.description)+'</small>'+(f&&v.odds[active]?.[f]?'<small>Approx. published odds in '+safe(f)+' packs: '+safe(v.odds[active][f])+'</small>':'')+matchPhoto(v)+'</div>').join('');
if(poss.length>16)txt+='<p class="little">Showing 16 of '+poss.length+'. Add more clues to narrow it.</p>';
txt+='<div class="little">'+(poss.length===1?'<b>Strong candidate, NOT automatically authenticated.</b> Visually confirm the exact surface.':'More than one version can have the same serial denominator. The face pattern and product format identify the family.')+'</div>';
box.innerHTML=txt;
}
function save(){if(!picked){$('savedstatus').textContent='Find a card before saving.';return;}const c=picked.c,key='flagship-pulls-v2';let prev;try{prev=JSON.parse(localStorage.getItem(key)||'[]')}catch{prev=[]}prev.push({code:c.code,name:c.name,set:L[picked.key],family:c.set,type:c.type,serial:$('stamp').value,finish,format:$('format').value,date:new Date().toISOString()});try{localStorage.setItem(key,JSON.stringify(prev));$('savedstatus').textContent='✓ Saved to THIS browser only ('+prev.length+' pulls total).';showSaved();}catch(e){$('savedstatus').textContent='Unable to save (browser storage may be disabled).'} }
function getSaved(){try{return JSON.parse(localStorage.getItem('flagship-pulls-v2')||'[]')}catch(e){return []}}
function showSaved(){const rows=getSaved();$('pullrows').innerHTML=rows.length?rows.slice().reverse().map((r,j)=>'<div class="match"><div><b>'+safe(r.name)+'</b><span class="chip">'+safe(r.set)+'</span><small>#'+safe(r.code)+' · '+safe(r.family)+(r.serial?' · serial '+safe(r.serial):'')+'</small></div><button type="button" class="clearbtn" data-delete="'+(rows.length-1-j)+'">Remove</button></div>').join(''):'No cards saved yet.';$('pullrows').querySelectorAll('[data-delete]').forEach(btn=>btn.onclick=()=>{const r=getSaved();r.splice(+btn.dataset.delete,1);localStorage.setItem('flagship-pulls-v2',JSON.stringify(r));showSaved();});}
function exportSaved(){const rows=getSaved();if(!rows.length){$('pullrows').textContent='No cards to export yet.';return;}const cols=['name','code','set','family','type','serial','finish','format','date'];const csv=[cols.join(','),...rows.map(r=>cols.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(','))].join('\r\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='2026-Topps-Flagship-My-Pulls.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
function trial(){$('q').value='557';set='series2';setButtons();search();const x=searchHits.find(x=>x.c.type==='Base'&&x.c.code==='557');if(x)choose(x,false);$('stamp').value='09/25';$('none').checked=false;$('format').value='ASG';finish='asg';fillFinishes();solve();$('picked').scrollIntoView({block:'start',behavior:'smooth'});}
function setButtons(){$('setselect').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.set===set));}
$('setselect').querySelectorAll('button').forEach(b=>b.onclick=()=>{set=b.dataset.set;setButtons();search();});
$('q').oninput=search;$('clear').onclick=()=>{$('q').value='';search();$('q').focus()};$('try').onclick=trial;
for(const id of ['stamp','format','none'])$(id).addEventListener(id==='stamp'?'input':'change',()=>{if(id==='stamp'&&$('stamp').value)$('none').checked=false;else if(id==='none'&&$('none').checked)$('stamp').value='';solve()});
$('resetfilter').onclick=()=>{$('stamp').value='';$('none').checked=false;$('format').value='';finish='';fillFinishes();solve()};
$('catalogset').onchange=catalog;$('rainfilter').oninput=catalog;$('save').onclick=save;
$('exportpulls').onclick=exportSaved;$('clear-pulls').onclick=()=>{if(confirm('Delete saved card pulls from this browser?')){localStorage.removeItem('flagship-pulls-v2');showSaved()}};showSaved();
$('upload').onchange=e=>{const file=e.target.files?.[0],img=$('myphoto');if(img.dataset.url)URL.revokeObjectURL(img.dataset.url);if(!file)return;img.dataset.url=URL.createObjectURL(file);img.src=img.dataset.url;img.hidden=false;};
fillFinishes();showPhotos();catalog();solve();
Promise.all([Promise.all(['series1','series2','update26'].map(key=>fetch('data/'+key+'.json').then(r=>{if(!r.ok)throw Error(key+': '+r.status);return r.json()}).then(d=>DATA[key]=d))),fetch('media/base-cards/base-examples.json').then(r=>r.ok?r.json():{}).catch(()=>({}))])
.then(v=>{Object.assign(refs,v[1]);$('load').textContent='✅ Series 1, Series 2 & Update checklists ready · 1,050 verified base cards + searchable special checklist entries.';search();let p=new URLSearchParams(location.search);if(p.get('q')){$('q').value=p.get('q');search();}})
.catch(e=>{$('load').textContent='⚠️ Checklist load failed. Reload while online.';console.error(e);});
})();