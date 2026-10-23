"""Build 2026 flagship lookups from Topps-hosted PDF checklists, never from invented cards."""
import re, json, urllib.request, collections
from pathlib import Path
import fitz
ROOT=Path("card-lookup")
URLS={
"series1":"https://cdn.shopify.com/s/files/1/0662/9749/5709/files/2026_Topps_Series_1_Baseball_Checklist_2-23.pdf?v=1772557808",
"series2":"https://cdn.shopify.com/s/files/1/0662/9749/5709/files/2026_Topps_Series_2_Baseball_Checklist_5-11.pdf?v=1778521905",
"update26":"https://cdn.shopify.com/s/files/1/0662/9749/5709/files/2026_Topps_Update_Series_Baseball_Checklist_10-19.pdf?v=1792504951"
}
TEAMS=["Arizona Diamondbacks","Atlanta Braves","Baltimore Orioles","Boston Red Sox","Chicago Cubs","Chicago White Sox","Cincinnati Reds","Cleveland Guardians","Colorado Rockies","Detroit Tigers","Houston Astros","Kansas City Royals","Los Angeles Angels","Los Angeles Dodgers","Miami Marlins","Milwaukee Brewers","Minnesota Twins","New York Mets","New York Yankees","Philadelphia Phillies","Pittsburgh Pirates","San Diego Padres","San Francisco Giants","Seattle Mariners","St. Louis Cardinals","Tampa Bay Rays","Texas Rangers","Toronto Blue Jays","Washington Nationals","Oakland Athletics","Athletics","Angels","Brooklyn Dodgers"]
TEAMS=sorted(TEAMS,key=len,reverse=True)
def getpdf(url):
 req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0"})
 with urllib.request.urlopen(req,timeout=80) as res:return res.read()
def tidy(s):
 return " ".join(s.replace("®","").replace("™","").split())
def parse_line(v,prefix):
 v=tidy(v)
 pattern=(r"^(US\d{1,3})\s+" if prefix else r"^(\d{1,3})\s+")
 m=re.match(pattern,v)
 if not m:return None
 code, rest=m.group(1),v[m.end():]
 found=None
 for team in TEAMS:
  match=re.search(r"(?<!\w)"+re.escape(team)+r"(?=\s|$)",rest,re.I)
  if match:
   if found is None or match.start()<found[0]:found=(match.start(),match.end(),team)
 if not found:return None
 name=rest[:found[0]].strip(" –-");tail=rest[found[1]:].strip()
 if len(name)<2 or len(name)>95:return None
 return dict(code=code,name=name,team=found[2],type="Base",set="Base Cards",rookie=bool(re.search(r"\bRookie\b",tail)),designation=tail)
def parse(name,pdf):
 doc=fitz.open(stream=pdf,filetype="pdf")
 prefix=name=="update26"
 lo,hi=(1,350) if name=="series1" else ((351,700) if name=="series2" else (1,350))
 candidates=[]
 seen_headings=[]
 for n,page in enumerate(doc):
  if n>13:break
  lines=page.get_text("text",sort=True).splitlines()
  pp=[]
  for line in lines:
   row=parse_line(line,prefix)
   if not row:continue
   idx=int(re.sub("[^0-9]","",row["code"]))
   if lo<=idx<=hi:pp.append(row)
  print(name,"PAGE",n+1,"candidates",len(pp),"sample",pp[:2],"first lines",lines[:6])
  candidates+=pp
  if len({r["code"] for r in candidates})>=350:break
 grouped=collections.OrderedDict()
 for row in candidates:
  key=row["code"]
  if key not in grouped:grouped[key]=row.copy()
  elif row["name"] not in grouped[key]["name"].split(" / "):
   grouped[key]["name"]+=" / "+row["name"]
   grouped[key]["rookie"]|=row["rookie"]
 cards=list(grouped.values())
 numset={int(re.sub("[^0-9]","",x["code"])) for x in cards}
 missing=[x for x in range(lo,hi+1) if x not in numset]
 if len(cards)!=350 or missing:
  print(name,"MISSING",missing,"COUNT",len(cards))
  raise RuntimeError("Refusing partial manufacturer checklist: "+name+" "+str(len(cards))+" entries")
 cards.sort(key=lambda x:int(re.sub("[^0-9]","",x["code"])))
 out=dict(source=URLS[name],sourceLabel="Official Topps checklist — base cards manufacturer-verified",coverage="base-only",count=len(cards),manufacturerAudit={"verifiedFields":["base card number","player or team name","team","rookie flag where provided"],"scope":"350 base-card numbers only; inserts/autographs NOT fully indexed", "verified":True},cards=cards)
 p=ROOT/"data"/(name+".json");p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(out,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
 print("SUCCESS",name,len(cards),"rookie",sum(c["rookie"] for c in cards),"samples",cards[:3])
if __name__=="__main__":
 for name,url in URLS.items():
  pdf=getpdf(url);print("FETCHED",name,len(pdf));parse(name,pdf)
