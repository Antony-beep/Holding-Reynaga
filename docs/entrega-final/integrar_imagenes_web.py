import json, zipfile, xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).parent
src=Path(r'C:\Users\Tony\Desktop\IMÁGENES DE LA WEB INMOBILIARIAHOLDINGREYNAGA.docx')
media=root/'imagenes'/'web'
media.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(src) as z:
    for i in range(1,25):
        name=f'word/media/image{i}.png'
        (media/f'web-{i:02}.png').write_bytes(z.read(name))
data_path=root/'contenido.json'
data=json.loads(data_path.read_text(encoding='utf-8'))
# Append image portfolio pages, categorized by labels/headings in the supplied DOCX.
groups=[
 ('EXPERIENCIA WEB · 09','Recorrido y propuesta visual','Secciones principales del sitio',[(1,'Hero principal'),(2,'Ubicación estratégica'),(3,'Espacios de conexión'),(4,'Maqueta interactiva'),(5,'Tour virtual · vista A'),(6,'Tour virtual · vista B'),(7,'Tour virtual · vista G'),(8,'Catálogo de departamentos')]),
 ('CATÁLOGO Y CONTACTO · 10','Departamentos y captación','Detalle de producto y canales comerciales',[(9,'Detalle de departamento · tipo A'),(10,'Galería y características del departamento'),(11,'Consulta por WhatsApp con tipo de departamento'),(12,'Dossier informativo descargable'),(13,'Vista del dossier'),(14,'Formulario de contacto'),(15,'Medios de contacto')]),
 ('CONTENIDO Y CONFIANZA · 11','Contenido, SEO y presencia social','Recursos para informar y facilitar descubrimiento',[(16,'Publicaciones de redes sociales'),(17,'Preguntas frecuentes'),(18,'Blog y guías de recursos'),(19,'Redes sociales antes del pie de página'),(20,'Pie de página y navegación'),(21,'Términos y condiciones'),(22,'Política de privacidad')]),
 ('TRANSPARENCIA · 12','Atención e información legal','Páginas de transparencia y atención al consumidor',[(23,'Libro de Reclamaciones · formulario'),(24,'Libro de Reclamaciones · continuación')])]
for kicker,title,subtitle,imgs in groups:
    blocks=[]
    for i,caption in imgs:
        blocks.append({'type':'image','source':'attached','file':f'web-{i:02}.png','width':0.82,'caption':f'Figura web {i}. {caption}.'})
    data['pages'].append({'kicker':kicker,'title':title,'subtitle':subtitle,'blocks':blocks})
data['version']='1.2'
data_path.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
# generator routes attached assets from extracted local folder.
p=root/'generar_pdf.py'; s=p.read_text(encoding='utf-8')
s=s.replace("source = MANUAL if block.get('source') == 'manual' else REF\n        shutil.copyfile(source / name, ASSETS / name)","source = MANUAL if block.get('source') == 'manual' else (ROOT / 'imagenes' / 'web' if block.get('source') == 'attached' else REF)\n        if (source / name).resolve() != (ASSETS / name).resolve():\n            shutil.copyfile(source / name, ASSETS / name)")
p.write_text(s,encoding='utf-8')
print(f'Extraídas {len(list(media.glob("*.png")))} imágenes; añadidas {len(groups)} secciones visuales.')
