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
 if not name and "Team Card" in tail: name=found[2]
 if len(name)<2 or len(name)>95:return None
 return dict(code=code,name=name,team=found[2],type="Base",set="Base Cards",rookie=bool(re.search(r"\bRookie\b",tail)),designation=tail)
def extra_cards(doc):
 cards=[]
 heading="Insert checklist"
 seen=set()
 ignored={"HOBBY EXCLUSIVE","RETAIL EXCLUSIVE","JUMBO EXCLUSIVE","BASE","BASE SET","HOBBY/HOBBY JUMBO ONLY","SUBJECT TO CHANGE","PARALLELS","CHROME","INSERTS"}
 for page_n,page in enumerate(doc):
  for raw in page.get_text("text",sort=True).splitlines():
   line=tidy(raw)
   if (line and len(line)>5 and len(line)<105 and not re.match(r"^([A-Z0-9]+[-\d])",line)
       and line==line.upper() and sum(x.isalpha() for x in line)>3):
    if line not in ignored and not line.startswith(("CHECKLISTS PROVIDED","*SUBJECT","PAGE ","HOBBY/")):
     if any(kw in line for kw in ["AUTOGRAPH","RELIC","MEMORABILIA","MATERIAL","SWATCH","1991 TOPPS","ALL ACES","HOME FIELD","BIG TICKET","HEAVY LUMBER","STARS OF MLB","TITANS OF THE GAME","1952","COVER ATHLETES","INSERT","SIGNATURE","VARIATION","SHORT PRINT","RED","GREATEST HITS","CITY CONNECT","FOIL","FUTURE STARS","DIE CUT","BASEBALL STARS","PLAYER NUMBER"]):
      heading=line
    continue
   m=re.match(r"^([A-Z0-9]{2,10}-[A-Z0-9]{1,10})\s+(.+)$",line)
   if not m: continue
   code,rest=m.groups()
   if len(rest)>145 or len(rest)<3:continue
   matches=[]
   for team in TEAMS:
    match=re.search(r"(?<!\w)"+re.escape(team)+r"(?=\s|$)",rest,re.I)
    if match:matches.append((match.start(),match.end(),team))
   if matches:
    a,b,team=min(matches,key=lambda x:x[0]);name=rest[:a].strip(" –-")
   else:name=rest.strip();team=""
   if len(name)<2 or len(name)>88:continue
   tag=heading.upper()
   kind=("Autograph" if ("AUTOGRAPH" in tag or "SIGNATURE" in tag)
      else ("Relic" if any(w in tag for w in ["RELIC","MEMORABILIA","MATERIAL","SWATCH"])
      else ("Variation" if "VARIATION" in tag else "Insert")))
   k=(code,name,heading)
   if k in seen:continue
   seen.add(k)
   prefix=code.split("-")[0]
   KNOWN={"AA":"All Aces","AK":"All Kings","T91":"1991 Topps Baseball","91B2":"1991 Topps Baseball","U91":"1991 Topps Baseball","U91C":"1991 Topps Chrome Baseball","91AS":"1991 Topps All-Stars","HA":"Home Field Advantage","BTP":"Big Ticket Players","SMLB":"Stars of MLB","BSA":"Baseball Stars Autographs","BSA2":"Baseball Stars Autographs","BSAU":"Baseball Stars Autographs"}
   corrected=KNOWN.get(prefix,heading)
   if prefix in KNOWN:kind=("Autograph" if "Autograph" in corrected else "Insert")
   elif corrected=="INSERT":corrected="Insert (subset to confirm)"
   cards.append(dict(code=code,name=name,team=team,type=kind,set=corrected,rookie=bool(re.search(r"\bRookie\b",rest)),provenance="Official Topps PDF, page "+str(page_n+1),subsetConfidence=("prefix-confirmed" if prefix in KNOWN else "heading-inferred")))
 return cards

def parse(name,pdf):
 doc=fitz.open(stream=pdf,filetype="pdf")
 prefix=name=="update26"
 lo,hi=(1,350) if name=="series1" else ((351,700) if name=="series2" else (1,350))
 candidates=[]
 seen_headings=[]
 for n,page in enumerate(doc):
  if (name=="series1" and n>=6) or n>15:break
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
 extras=extra_cards(doc)
 print("EXTRAS",name,len(extras),"samples",extras[:9])
 allcards=cards+extras
 out=dict(source=URLS[name],sourceLabel="Official Topps PDF — 350 base cards verified, additional printed insert IDs indexed",coverage="base-verified-extras-pdf",count=len(allcards),manufacturerAudit={"verifiedFields":["base card number","player or team name","team","rookie flag where provided"],"scope":"350 base-card numbers fully validated; supplemental PDF insert/autograph IDs parsed but some subsets may require visual cross-check", "verified":True},cards=allcards)
 p=ROOT/"data"/(name+".json");p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(out,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
 print("SUCCESS",name,len(cards),"rookie",sum(c["rookie"] for c in cards),"samples",cards[:3])
if __name__=="__main__":
 for name,url in URLS.items():
  pdf=getpdf(url);print("FETCHED",name,len(pdf));parse(name,pdf)
