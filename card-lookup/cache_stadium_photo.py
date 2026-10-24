"""Cache authentic Topps 2025 Stadium Club standard-base card reference; preserve 8 existing references."""
from pathlib import Path
from PIL import Image, ImageOps
from zipfile import ZipFile, ZIP_DEFLATED
import requests, io, json
d=Path("card-lookup/media/base-cards");d.mkdir(parents=True,exist_ok=True)
url="https://images.topps.com/v3/assets/bltc7206971cb4b2bfc/blt5fb9da6221ab05a8/696a63785d36f60008726218/25SCBB_1832_FR.jpg"
r=requests.get(url,headers={"User-Agent":"Mozilla/5.0"},timeout=40);r.raise_for_status()
im=ImageOps.exif_transpose(Image.open(io.BytesIO(r.content))).convert("RGB")
assert im.width>=500 and im.height>=700,"Unexpectedly low resolution Stadium Club photo"
im.thumbnail((1000,1450),Image.Resampling.LANCZOS)
out=d/"stadium25.jpg";im.save(out,quality=88,optimize=True,progressive=True)
assert out.stat().st_size>40000,"Unusually tiny image"
index=d/"base-examples.json";j=json.loads(index.read_text(encoding="utf-8"))
assert "stadium25" in j,"Stadium Club metadata missing"
j["stadium25"]["image"]="media/base-cards/stadium25.jpg"
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
