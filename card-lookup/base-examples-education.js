(()=>{
'use strict';
const pick=document.getElementById('edition');
const content=document.getElementById('base-education-content');
if(!pick||!content)return;
const photos=fetch('media/base-cards/base-examples.json').then(r=>{if(!r.ok)throw Error('No index');return r.json()});
const render=()=>{const k=pick.value;content.textContent='Loading real card example…';photos.then(data=>{
if(k!==pick.value)return;const ref=data[k];if(!ref){content.textContent='Image not yet available';return;}
content.textContent='';
const card=document.createElement('div');card.className='base-photo-card';card.style.cssText='margin:0;border:0;box-shadow:none;padding:3px 0';
const photo=document.createElement('div');photo.className='base-photo-image';
if(ref.image){const a=document.createElement('a');a.href=ref.image;a.target='_blank';a.rel='noopener';const img=document.createElement('img');img.src=ref.image;img.className='base-photo-actual';img.loading='lazy';img.alt='Actual card reference: '+ref.label;a.append(img);photo.append(a)}
const copy=document.createElement('div');copy.className='base-photo-copy';
const title=document.createElement('strong');title.className='base-photo-title';title.textContent=ref.label;
const status=document.createElement('div');status.className='base-photo-status';status.textContent=ref.status;
const note=document.createElement('p');note.textContent=ref.note;
const links=document.createElement('div');links.className='base-photo-links';const link=document.createElement('a');link.href=ref.source;link.target='_blank';link.rel='noopener';link.textContent='Image source ↗';
links.append(link);if(ref.image){const zoom=document.createElement('a');zoom.href=ref.image;zoom.target='_blank';zoom.rel='noopener';zoom.textContent='🔍 Enlarge image ↗';links.prepend(zoom)}
copy.append(title,status,note,links);card.append(photo,copy);content.append(card);
}).catch(()=>{if(k===pick.value)content.textContent='Photo reference unavailable. Card lookup still works.'})};
pick.addEventListener('change',render);render();
})();