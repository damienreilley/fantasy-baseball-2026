import json, re, urllib.request, html
from bs4 import BeautifulSoup
from pathlib import Path
BASE=Path("card-lookup/data"); BASE.mkdir(parents=True,exist_ok=True)
SOURCES={
 "chrome25":"https://www.cardboardchecklist.com/checklist/2025-topps-chrome-update-series-baseball",
 "pulse26":"https://www.cardboardchecklist.com/checklist/2026-pulse-x-big-league-chew-baseball",
 "panini26":"https://www.checklistinsider.com/2026-panini-stars-stripes-prizm-usa-baseball",
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
 # Retain headings and nearby checklist rows only, never claim a subset beyond what is parsed.
 out=[];seen=set();current=""; category="Base"
 for el in soup.select('h2,h3,h4,p,li'):
  if el.name in ('h2','h3','h4'):
   title=el.get_text(' ',strip=True)
   if any(x in title.lower() for x in ['checklist','base','autograph','material','signatures','all-american','color blast','fireworks','prizmatic','talisman','future is now']):
    current=title.replace(' Checklist','').strip()
    category=('Autograph' if 'signature' in title.lower() or 'autograph' in title.lower() else ('Relic' if 'material' in title.lower() else ('Base' if 'base' in title.lower() else 'Insert')))
   continue
  if not current: continue
  s=el.get_text(' ',strip=True)
  # HTML lists often each entry starts 1 <player> - <team>
  m=re.match(r'^(\d{1,3})\s+(.{3,110}?)(?:\s+[–-]\s+(.+))?$',s)
  if not m or len(s)>160:continue
  num,name,team=m.groups()
  if not (name and name[0].isalpha()) or name.startswith(('cards','pack')):continue
  k=(current,num,name)
  if k in seen:continue
  seen.add(k)
  out.append({'code':num,'name':name.strip(),'team':(team or '').strip(),'type':category,'rookie':False,'set':current})
 return out

for diagnostic_url in [
 "https://cardbreakcalculator.com/sets/2026-panini-stars-and-stripes-prizm-usa-baseball",
 "https://thecollectornation.com/releases/2026-panini-stars-stripes-prizm-usa-baseball",
 "https://gogts.net/2026-panini-usa-stars-stripes-prizm-baseball-cards-checklist/",
 "https://cardsmithsbreaks.com/full-checklist/2026-panini-usa-stars-stripes-prizm-baseball/"
]:
 try:
  raw=fetch(diagnostic_url)
  sou=BeautifulSoup(raw,'html.parser')
  print('DIAGNOSTIC',diagnostic_url,'length',len(raw),'tables',len(sou.select('table')),'li',len(sou.select('li')),'h2',[h.get_text(' ',strip=True)[:75] for h in sou.select('h2')[:12]])
  print('H2-BASE',[(e.name,e.get_text(' ',strip=True)[:120]) for e in sou.select('h2') if e.get_text(' ',strip=True)=='Base'])
  print('PARENT-BASE',[(e.parent.name,e.parent.get('class'),e.parent.get_text(' ',strip=True)[:600]) for e in sou.select('h2') if e.get_text(' ',strip=True)=='Base'])
  print('TAG-SAMPLES',[(e.name,e.get_text(' ',strip=True)[:130]) for e in sou.select('li, tr')[:12]])
  print('TABLE-FIRST',[(t.get_text(' ',strip=True)[:250]) for t in sou.select('table')[:2]])
  print('DOWNLOAD LINKS',[(a.get_text(' ',strip=True)[:35],a.get('href','')[:170]) for a in sou.select('a[href]') if any(x in a.get('href','').lower() for x in ['.xlsx','.xls','.csv','download'])][:12])
 except Exception as e:print('DIAGNOSTIC FAILURE',diagnostic_url,type(e).__name__,str(e)[:100])

for k,url in SOURCES.items():
 try:
  page=fetch(url)
  records=panini(page) if k=='panini26' else cardboard(page)
  print('RECORDS',k,len(records),'samples',records[:2])
  required={'chrome25':1000,'pulse26':490,'panini26':180}[k]
  if len(records)<required: raise ValueError(f"{k} too few parsed rows: {len(records)} < {required}")
  (BASE/f'{k}.json').write_text(json.dumps({'source':url,'count':len(records),'cards':records},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
 except Exception as e:
  print('FAIL',k,type(e).__name__,str(e))
