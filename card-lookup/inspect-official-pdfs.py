import urllib.request, fitz
SOURCES={
'chrome25':'https://cdn.shopify.com/s/files/1/0662/9749/5709/files/2025_Topps_Chrome_Update_Series_Baseball_Checklist.pdf?v=1780407368',
'logo26':'https://cdn.shopify.com/s/files/1/0662/9749/5709/files/2026_Topps_Chrome_Logofractor_Checklist.pdf?v=1786996133',
}
for name,url in SOURCES.items():
 try:
  r=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  data=urllib.request.urlopen(r,timeout=50).read()
  doc=fitz.open(stream=data,filetype='pdf')
  print('OFFICIAL',name,len(data),'bytes',doc.page_count,'pages')
  print('FIRST PAGE TEXT',repr(doc[0].get_text('text',sort=True)[:2700]))
  print('FIRST PAGE BLOCKS',repr(doc[0].get_text('blocks',sort=True)[:8]))
 except Exception as e: print('ERROR',name,repr(e));raise
