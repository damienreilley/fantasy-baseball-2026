"""Manufacturer audit for Stadium Club 2025 base (number+player) against Topps PDF."""
import json,re,unicodedata,urllib.request
from pathlib import Path
import fitz
URL='https://cdn.shopify.com/s/files/1/0662/9749/5709/files/2025_Topps_Stadium_Club_Baseball_Checklist.pdf?v=1769109095'
r=urllib.request.Request(URL,headers={'User-Agent':'Mozilla/5.0'})
pdf=urllib.request.urlopen(r,timeout=45).read()
doc=fitz.open(stream=pdf,filetype="pdf")
data=json.loads(Path("card-lookup/data/stadium25.json").read_text(encoding='utf-8'))
base=[x for x in data['cards'] if x['type']=='Base']
def norm(s):
 s=unicodedata.normalize('NFKD',s)
 return re.sub(r'\s+',' ',''.join(c for c in s if not unicodedata.combining(c)).replace('®',' ').replace('™',' ')).casefold().strip()
raw=" ".join(doc[p].get_text('text',sort=True) for p in range(min(4,len(doc))))
raw=raw.replace('®54','® 54').replace('®110','® 110').replace('™166','™ 166')
t=norm(raw)
mismatch=[]
for c in base:
 query=norm(str(c['code'])+' '+c['name'])
 if not re.search(r'(?<!\d)'+re.escape(query)+r'(?:\s|$)',t):
  mismatch.append({'code':c['code'],'name':c['name']})
print("MANUFACTURER_AUDIT","base",len(base),"matched",len(base)-len(mismatch),"mismatch",mismatch)
if mismatch:raise RuntimeError("Stadium Club manufacturer PDF name reconciliation failed")
