import hashlib
import json
from pathlib import Path
from pypdf import PdfReader
from PIL import Image, ImageOps, ImageDraw

SOURCE = Path(r'C:/Users/Tony/Downloads/Manual-Panel-Admin-Torres-Titanium-compressed.pdf')
DEST = Path(r'C:/Users/Tony/.codex/visualizations/2026/11/12/01a1cddd-0736-7441-9929-82e417b27460/manual-panel-extraido')
DEST.mkdir(exist_ok=True)
reader = PdfReader(SOURCE)
seen = {}
manifest = []
for pnum, page in enumerate(reader.pages, 1):
    for i, item in enumerate(page.images, 1):
        digest = hashlib.sha256(item.data).hexdigest()
        if digest in seen:
            seen[digest]['pages'].append(pnum)
            continue
        ext = Path(item.name).suffix
        filename = f'p{pnum:02d}-img{i:02d}{ext}'
        target = DEST / filename
        target.write_bytes(item.data)
        img = Image.open(target)
        row = {'file': filename, 'pages': [pnum], 'size': list(img.size), 'sha256': digest}
        seen[digest] = row
        manifest.append(row)
(DEST / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
for part in range((len(manifest) + 11) // 12):
    sheet = Image.new('RGB', (1320, 1120), '#dddddd')
    draw = ImageDraw.Draw(sheet)
    for j, row in enumerate(manifest[part * 12:(part + 1) * 12]):
        x, y = j % 3 * 440, j // 3 * 280
        draw.text((x + 6, y + 5), f"{row['file']} | pages {row['pages']}", fill='black')
        img = Image.open(DEST / row['file']).convert('RGB')
        thumb = ImageOps.contain(img, (430, 250))
        sheet.paste(thumb, (x, y + 25))
    sheet.save(DEST / f'contacto-{part + 1}.png')
print(json.dumps(manifest, ensure_ascii=False))
