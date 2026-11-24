import json
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak,
    KeepTogether,
)
from PIL import Image as PILImage

ROOT = Path(__file__).resolve().parent
REF = Path(r'C:\Users\Tony\.codex\visualizations\2026\11\12\01a1cddd-0736-7441-9929-82e417b27460\holding-referencia')
MANUAL = REF.parent / 'manual-panel-extraido'
ASSETS = ROOT / 'imagenes'
ASSETS.mkdir(exist_ok=True)
DATA = json.loads((ROOT / 'contenido.json').read_text(encoding='utf-8'))
dimensions = {}
for page in DATA['pages']:
    for block in page['blocks']:
        if block['type'] != 'image':
            continue
        name = block['file']
        source = MANUAL if block.get('source') == 'manual' else (ROOT / 'imagenes' / 'web' if block.get('source') == 'attached' else REF)
        if (source / name).resolve() != (ASSETS / name).resolve():
            shutil.copyfile(source / name, ASSETS / name)
        dimensions[name] = list(PILImage.open(ASSETS / name).size)
(ASSETS / 'dimensiones.json').write_text(json.dumps(dimensions), encoding='utf-8')

for name, file in [('Arial', 'arial.ttf'), ('Arial-Bold', 'arialbd.ttf'), ('Arial-Italic', 'ariali.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(Path('C:/Windows/Fonts') / file)))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold', italic='Arial-Italic', boldItalic='Arial-Bold')

NAVY = colors.HexColor('#0A1931')
GOLD = colors.HexColor('#A68126')
GRAY = colors.HexColor('#526074')
WIDTH = A4[0] - 100
S = {
    'body': ParagraphStyle('Body', fontName='Arial', fontSize=9.3, leading=13.1,
                           textColor=NAVY, spaceAfter=7),
    'kicker': ParagraphStyle('Kicker', fontName='Arial-Bold', fontSize=8, leading=11,
                             textColor=GOLD, spaceAfter=7),
    'title': ParagraphStyle('Title', fontName='Arial-Bold', fontSize=25, leading=29,
                            textColor=NAVY, spaceAfter=6),
    'subtitle': ParagraphStyle('Subtitle', fontName='Arial', fontSize=10, leading=14,
                               textColor=GRAY, spaceAfter=13),
    'h2': ParagraphStyle('H2', fontName='Arial-Bold', fontSize=11, leading=14,
                         textColor=NAVY, spaceBefore=7, spaceAfter=6, keepWithNext=True),
    'note': ParagraphStyle('Note', fontName='Arial', fontSize=8.1, leading=11.2,
                           textColor=GRAY, spaceBefore=4, spaceAfter=7),
    'small': ParagraphStyle('Small', fontName='Arial', fontSize=7.5, leading=10.2,
                            textColor=GRAY, spaceBefore=5, spaceAfter=5),
    'caption': ParagraphStyle('Caption', fontName='Arial-Italic', fontSize=7.5, leading=10,
                              textColor=GRAY, spaceBefore=4, spaceAfter=10),
    'cell': ParagraphStyle('Cell', fontName='Arial', fontSize=8.6, leading=11.8,
                           textColor=NAVY),
    'cellhead': ParagraphStyle('CellHead', fontName='Arial-Bold', fontSize=8.4, leading=11.5,
                               textColor=colors.white),
    'list': ParagraphStyle('List', fontName='Arial', fontSize=9.1, leading=12.7,
                           textColor=NAVY, leftIndent=13, firstLineIndent=-11, spaceAfter=5),
}


def para(text, style='body'):
    return Paragraph(escape(text), S[style])


def make_table(block):
    rows = [[para(t, 'cellhead' if i == 0 else 'cell') for t in row]
            for i, row in enumerate(block['rows'])]
    table = Table(rows, colWidths=[WIDTH * f for f in block['widths']], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#F0F3F7'), colors.white]),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, colors.HexColor('#D6DEE7')),
    ]))
    return [table, Spacer(1, 7)]


def elements(page, page_index):
    out = [para(page['kicker'], 'kicker'), para(page['title'], 'title'),
           para(page['subtitle'], 'subtitle')]
    for block in page['blocks']:
        kind = block['type']
        if kind == 'table':
            out.extend(make_table(block))
        elif kind in ('bullets', 'steps'):
            for i, text in enumerate(block['items']):
                prefix = f'{i + 1}. ' if kind == 'steps' else '• '
                out.append(para(prefix + text, 'list'))
        elif kind == 'image':
            img = Image(str(ASSETS / block['file']))
            scale = block.get('width', 0.88 if page_index == 0 else 1)
            width = WIDTH * scale
            img.drawHeight = width * img.imageHeight / img.imageWidth
            img.drawWidth = width
            img.hAlign = 'LEFT'
            out.append(KeepTogether([Spacer(1, 4), img, para(block['caption'], 'caption')]))
        elif kind == 'link':
            out.append(Paragraph(f'<link href="{escape(block["url"], {chr(34): "&quot;"})}" color="#155C93"><u>{escape(block["text"])}</u></link>', S['body']))
        else:
            out.append(para(block['text'], 'body' if kind == 'p' else kind))
    return out


def decorate(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.3)
    canvas.line(50, A4[1] - 32, A4[0] - 50, A4[1] - 32)
    canvas.setFont('Arial', 7.2)
    canvas.setFillColor(GRAY)
    canvas.drawString(50, 28, f'HOLDING REYNAGA · TORRES TITANIUM · ENTREGA v{DATA["version"]}')
    canvas.drawRightString(A4[0] - 50, 28, f'{doc.page} / {len(DATA["pages"])}')
    canvas.restoreState()


story = []
for i, page in enumerate(DATA['pages']):
    if i:
        story.append(PageBreak())
    story.extend(elements(page, i))
path = ROOT / f'Holding-Reynaga-Entrega-v{DATA["version"]}.pdf'
doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=50, rightMargin=50,
                        topMargin=48, bottomMargin=46,
                        title=DATA['title'], author='Holding Inversiones Reynaga S.A.C.',
                        subject='Entrega funcional y operativa de la aplicación web')
doc.build(story, onFirstPage=decorate, onLaterPages=decorate)
print(path)
