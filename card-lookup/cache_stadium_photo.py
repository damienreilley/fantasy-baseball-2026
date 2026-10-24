"""Cache authentic Topps 2025 Stadium Club standard-base card reference; preserve 8 existing references."""
from pathlib import Path
from PIL import Image, ImageOps
from zipfile import ZipFile, ZIP_DEFLATED
import requests, io, json
d=Path("card-lookup/media/base-cards");d.mkdir(parents=True,exist_ok=True)
url="https://images.topps.com/v3/assets/bltc7206971cb4b2bfc/blt5fb9da6221ab05a8/696a63785d36f60008726218/25SCBB_1832_FR.jpg"
alternates=[
 (url,"Jackson Holliday — Topps official example","https://www.topps.com/pages/topps-stadium-club-baseball","Official Topps 2025 Stadium Club base-card image"),
 ("https://i.ebayimg.com/images/g/r4cAAeSw9ZFpljWe/s-l1600.jpg","Matt Shaw #65","https://www.sportscardinvestor.com/cards/matt-shaw-baseball/2025-topps-stadium-club-base-65","Actual 2025 Stadium Club base-card photograph (seller-supplied)"),
 ("https://cdn11.bigcommerce.com/s-4tfim2hspp/images/stencil/1280x1280/products/7657/12482/2025-stadium-club-paul-skenes__71244.1769116052.jpg","Paul Skenes","https://allstarsportsgr.com/2025-topps-stadium-club-baseball-value-box-blaster-box-preorder/","Promotional Stadium Club base-card reference")
]
for candidate,label,credit,status in alternates:
 try:
  r=requests.get(candidate,headers={"User-Agent":"Mozilla/5.0","Accept":"image/avif,image/webp,image/png,image/jpeg,*/*"},timeout=30)
  r.raise_for_status()
  im=ImageOps.exif_transpose(Image.open(io.BytesIO(r.content))).convert("RGB")
  assert im.width>400 and im.height>400
  print("FOUND VALID IMAGE",label,im.size,len(r.content))
  url=candidate
  break
 except Exception as e: print("IMAGE SOURCE UNAVAILABLE",label,str(e)[:170])
else:raise RuntimeError("All verified Stadium Club base-card image sources unavailable")
assert im.width>=500 and im.height>=700,"Unexpectedly low resolution Stadium Club photo"
im.thumbnail((1000,1450),Image.Resampling.LANCZOS)
out=d/"stadium25.jpg";im.save(out,quality=88,optimize=True,progressive=True)
assert out.stat().st_size>40000,"Unusually tiny image"
index=d/"base-examples.json";j=json.loads(index.read_text(encoding="utf-8"))
assert "stadium25" in j,"Stadium Club metadata missing"
j["stadium25"]["image"]="media/base-cards/stadium25.jpg"
j["stadium25"]["label"]=label
j["stadium25"]["status"]=status
j["stadium25"]["source"]=credit
j["stadium25"]["originImageUrl"]=url
j["stadium25"]["width"]=im.width
j["stadium25"]["height"]=im.height
index.write_text(json.dumps(j,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
arch=d/"Pack_Room_Base_Card_Reference_Photos.zip"
notes=["PACK ROOM - BASE CARD REFERENCE IMAGES","These are credited reference card images only. Some are promotional mock-ups; labels state their evidence.", ""]
with ZipFile(arch,"w",ZIP_DEFLATED,compresslevel=6) as z:
 z.write(index,"base-examples.json")
 for key,v in j.items():
  if key=="asg26":continue
  loc=v.get("image","")
  p=d/Path(loc).name
  if p.is_file():
   z.write(p,p.name)
  notes.extend([f"{key} -- {v.get('label','')}",f"Source: {v.get('source','')}",f"Status: {v.get('status','')}", ""])
 z.writestr("SOURCE_NOTES.txt","\n".join(notes))
print("SAVED stadium25",im.size,out.stat().st_size,"archive",arch.stat().st_size,"metadata",len(j))
