import json, re, urllib.request, html
from bs4 import BeautifulSoup
from pathlib import Path
BASE=Path("card-lookup/data"); BASE.mkdir(parents=True,exist_ok=True)
SOURCES={
 "chrome25":"https://www.cardboardchecklist.com/checklist/2025-topps-chrome-update-series-baseball",
 "pulse26":"https://www.cardboardchecklist.com/checklist/2026-pulse-x-big-league-chew-baseball",
 "panini26":"https://cardsmithsbreaks.com/full-checklist/2026-panini-usa-stars-stripes-prizm-baseball/",
}
def fetch(url):
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; CardChecklistResearch/1.0)'})
 with urllib.request.urlopen(req,timeout=45) as res:return res.read().decode('utf-8','replace')
def cardboard(text):
 soup=BeautifulSoup(text,'html.parser')
 table=next((t for t in soup.select('table') if 'Card #' in t.get_text(' ',strip=True) and 'Player' in t.get_text(' ',strip=True)),None)
 print('CDB tables',len(soup.select('table')),'candidate',bool(table),'length',len(text))
 if not table:return []
 out=[]
 for row in table.select('tr'):
  cells=[c.get_text(' ',strip=True) for c in row.find_all(['td'])]
  if len(cells)<5:continue
  card,name,team,kind,rookie=cells[:5]
  subset=cells[5] if len(cells)>5 else ''
  if not card or not name or card.lower().startswith('card'):continue
  out.append({'code':card,'name':name,'team':team,'type':kind,'rookie':bool(rookie and rookie not in ['—','-']),'set':subset})
 return out
def panini(text):
 soup=BeautifulSoup(text,'html.parser')
 out=[]
 for table in soup.select('table'):
  heads=[th.get_text(' ',strip=True).lower() for th in table.select('thead th')]
  if not ('player' in heads and 'team' in heads):continue
  previous=table.find_previous(['h2','h3','h4'])
  heading=previous.get_text(' ',strip=True) if previous else ''
  label=re.sub(r'\s+\d+\s+cards?$', '', heading,flags=re.I).strip()
  low=label.lower()
  if low.startswith('base') or 'greats' in low: category='Base'
  elif 'material' in low:category='Relic'
  elif 'signature' in low or 'autograph' in low:category='Autograph'
  else:category='Insert'
  for row in table.select('tbody tr'):
   cells=[td.get_text(' ',strip=True) for td in row.find_all('td')]
   if len(cells)<3:continue
   code,name,team=cells[:3]
   if not re.fullmatch(r'\d{1,3}',code) or not name:continue
   out.append({'code':code,'name':name,'team':team,'type':category,'rookie':False,'set':label})
 return out

for k,url in SOURCES.items():
 try:
  page=fetch(url)
  records=panini(page) if k=='panini26' else cardboard(page)
  if k=='chrome25':
   # Exact printed-card-number mistakes verified against Topps' 200-card PDF:
   # Cal Raleigh shares USC45 with Tommy Pham (instead of USC1);
   # Dustin May shares USC80 with Tyler Locklear (instead of USC167).
   expanded=[]
   for row in records:
    if row['type']=='Base' and row['code']=='USC45' and 'Cal Raleigh' in row['name']:
     expanded.append({**row,'name':'Tommy Pham','team':'Pittsburgh Pirates'})
     expanded.append({**row,'name':'Cal Raleigh','team':'Seattle Mariners'})
    elif row['type']=='Base' and row['code']=='USC80' and 'Dustin May' in row['name']:
     expanded.append({**row,'name':'Tyler Locklear','team':'Arizona Diamondbacks','rookie':True})
     expanded.append({**row,'name':'Dustin May','team':'Boston Red Sox'})
    else:expanded.append(row)
   records=expanded
   assert len([x for x in records if x['type']=='Base'])==200,'Expected exactly 200 Chrome Update base cards after misnumbering correction'

  print('RECORDS',k,len(records),'samples',records[:2])
  required={'chrome25':1000,'pulse26':490,'panini26':1000}[k]
  if len(records)<required: raise ValueError(f"{k} too few parsed rows: {len(records)} < {required}")
  (BASE/f'{k}.json').write_text(json.dumps({'source':url,'count':len(records),'sourceLabel':('Topps checklist + corrected printed numbers' if k=='chrome25' else 'Independent checklist reference'),'cards':records},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
 except Exception as e:
  print('FAIL',k,type(e).__name__,str(e))
