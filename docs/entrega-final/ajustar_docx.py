import json
from pathlib import Path
f=Path('docs/entrega-final/contenido.json'); d=json.loads(f.read_text(encoding='utf-8'))
# The section numbers follow the final reading order.
kickers=['ENTREGA · 01','EXPERIENCIA DEL PROYECTO · 02','CATÁLOGO Y CONTACTO · 03','PANEL COMERCIAL · 04','ATENCIÓN AL CONSUMIDOR · 05','INTEGRACIONES · 06','VISIBILIDAD Y MEDICIÓN · 07','SEGURIDAD Y AGENTES · 08','REDES SOCIALES · 09','OPERACIÓN Y TRANSFERENCIA · 10']
for page,k in zip(d['pages'],kickers): page['kicker']=k
for b in d['pages'][0]['blocks']:
 if b.get('type')=='table':
  for row in b['rows']:
   if row and row[0]=='Documento': row[1]='12 de noviembre de 2026 · Versión 1.2 · Uso interno'
f.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
