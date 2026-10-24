"""Cache one identifiable real-card example per owned product in GitHub Pages.
Sources are attributed in base-examples.json.  NOT card image generation.
Each download must be a readable image; no silent placeholder.
"""
from pathlib import Path
import io, json, requests
from PIL import Image, ImageOps
D=Path('card-lookup/media/base-cards');D.mkdir(parents=True,exist_ok=True)
cards={
'series1':{
 'url':'https://i.ebayimg.com/images/g/NckAAeSwAB5plzyZ/s-l1600.jpg',
 'label':'Aaron Judge #1','status':'Photograph of regular base card','source':'https://www.ebay.com/itm/168171292721','note':'Standard 2026 flagship base design; team colors change by player.'},
'series2':{
 'url':'https://storage.googleapis.com/images.pricecharting.com/3y46dywpvgpi3cte/1600.jpg',
 'label':'Leo Rivas #649','status':'Photograph of 2026 Topps Series 2 standard base card','source':'https://www.sportscardspro.com/game/baseball-cards-2026-topps-series-2/leo-rivas-649','note':'Same 2026 flagship design as Series 1; teams and photographs vary.'},
'update26':{
 'url':'https://thealleycc.com/cdn/shop/files/2026-topps-update-series-baseball-card-preview-1_73d2a8b5-8c03-4de3-a1fd-a842413b61c1.jpg?v=1792020281',
 'label':'Walker Buehler','status':'Topps official base-design promotional image','source':'https://thealleycc.com/products/2026-topps-update-series-baseball-hobby-box','note':'Update keeps the 2026 flagship visual design but uses separate US-numbered cards.'},
'chrome25':{
 'url':'https://tools.toywiz.com/_images/_webp/_products/me/nickkurtzusc178.webp',
 'label':'Nick Kurtz #USC178','status':'Photograph of standard base rookie','source':'https://toywiz.com/mlb-2025-topps-chrome-update-nick-kurtz-usc178-rookie/','note':'Topps Chrome surface looks metallic and the base design differs from flagship Topps.'},
'logo26':{
 'url':'https://www.checklistcenter.com/wp-content/uploads/2026/08/2026-Topps-Chrome-LogoFractor-Baseball-Base-LogoFractor-Shohei-Ohtani-MOCK-UP.jpeg',
 'label':'Shohei Ohtani','status':'Promotional mock-up of standard LogoFractor design','source':'https://www.checklistcenter.com/2026-topps-chrome-logofractor-baseball-card-checklist/','note':'Look for repeating MLB logos. Not every card inside a LogoFractor pack is a LogoFractor.'},
'pulse26':{
 'url':'https://cartessportivesrivesud.com/cdn/shop/files/2026-pulse-big-league-chew-baseball-hobby-box-pre-order-baseball-cards-810208291021-4354510.jpg?v=1776444914',
 'label':'Roman Anthony (promotional image)','status':'Retailer promotional illustration — base designation unverified','source':'https://cartessportivesrivesud.com/products/2026-pulse-big-league-chew-baseball-hobby-box-pre-order','note':'Product contains several distinct designs. Do not treat this promotional graphic as proof every BLCL base card looks identical.'},
'panini26':{
 'url':'https://i.ebayimg.com/images/g/mO0AAeSwPw9p4B9C/s-l1600.jpg',
 'label':'Jacob Seamon / Trey Rangel / Dexter McCleon Jr.','status':'Photograph of multiple regular base cards','source':'https://www.ebay.com/itm/306883174675','note':'Three genuine base examples; Panini Prizm has red, white and blue USA borders. Different insert sets look different.'}
}
s=requests.Session();s.headers.update({'User-Agent':'Mozilla/5.0 (compatible; CardGuideResearch/1.0; +https://github.com/damienreilley/fantasy-baseball-2026)','Accept':'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.7'})
out={}
for key,entry in cards.items():
 try:
  response=s.get(entry['url'],timeout=35)
  response.raise_for_status()
  im=Image.open(io.BytesIO(response.content)); im.load()
  print('FETCHED',key,im.size,im.format,len(response.content),response.url)
  if im.width<150 or im.height<150:raise ValueError('Image too small')
  im=ImageOps.exif_transpose(im).convert('RGB')
  # preserve full image/crop only letterboxing: no image generation or editing appearance
  if im.width>1200 or im.height>1500:im.thumbnail((1200,1500),Image.Resampling.LANCZOS)
  file=f'{key}.jpg';dest=D/file;im.save(dest,quality=86,optimize=True,progressive=True)
  out[key]={k:v for k,v in entry.items() if k!='url'}
  out[key]['image']='media/base-cards/'+file
  out[key]['originImageUrl']=entry['url']
  out[key]['width'],out[key]['height']=im.size
  print('SAVED',key,dest.stat().st_size)
 except Exception as e:
  print('FAILED',key,str(e))
  out[key]={k:v for k,v in entry.items() if k!='url'}
  out[key]['image']=''
  out[key]['originImageUrl']=entry['url']
# All Star uses SAME ordinary Series 2 base checklist. Distinguish special ASG parallel.
out['asg26']={'image':out.get('series2',{}).get('image',''),
 'label':'Leo Rivas #649 (ordinary Series 2 base)',
 'status':'Ordinary Series 2 base; All-Star Mega also includes exclusive logo-foil PARALLELS',
 'source':'https://www.beckett.com/news/2026-topps-all-star-game-mega-box-baseball-cards/',
 'note':'This box shares the regular Series 2 base design. Special ASG parallels have repeating Philadelphia 2026 All-Star logos. See the separate verified source for images.',
 'reference':'https://www.beckett.com/news/2026-topps-all-star-game-mega-box-baseball-cards/'}
(D/'base-examples.json').write_text(json.dumps(out,indent=2,ensure_ascii=False),encoding='utf-8')
from zipfile import ZipFile, ZIP_DEFLATED
zipfile=D/'Pack_Room_Base_Card_Reference_Photos.zip'
with ZipFile(zipfile,'w',compression=ZIP_DEFLATED,compresslevel=6) as z:
 z.write(D/'base-examples.json','base-examples.json')
 notes=['PACK ROOM BASE CARD PHOTO REFERENCE','Sourced and cached reference images for 2025–26 baseball card products.','','These are not guarantees that every card shares the precise appearance; team accents, insert styles, parallels and special editions can differ.','']
 for name,meta in out.items():
  if meta.get('image'):
   p=D/Path(meta['image']).name
   if not p.is_file(): raise RuntimeError('Missing reference image '+str(p))
   z.write(p,p.name)
  notes.extend([name+': '+meta.get('label',''), 'Status: '+meta.get('status',''), 'Source: '+meta.get('source',''), 'Note: '+meta.get('note',''), ''])
 z.writestr('SOURCE_NOTES.txt','\\n'.join(notes))
print('BUNDLED',zipfile.name,zipfile.stat().st_size)
if zipfile.stat().st_size<500000: raise RuntimeError('Image archive unexpectedly small — abort publication')

print('AVAILABLE',sum(bool(x.get('image')) for x in out.values()),'OF',len(out))
