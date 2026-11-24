const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, Footer, PageNumber, AlignmentType, HeadingLevel, LevelFormat,
  WidthType, ShadingType, BorderStyle, ExternalHyperlink,
} = require('docx');

const root = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(root, 'contenido.json'), 'utf8'));
const dimensions = JSON.parse(fs.readFileSync(path.join(root, 'imagenes', 'dimensiones.json'), 'utf8'));
const navy = '0A1931', gold = 'A68126', gray = '526074';
const width = 9906;
const numbering = [{ reference: 'bullets', levels: [{ level: 0,
  format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
  style: { paragraph: { indent: { left: 260, hanging: 220 } } } }] }];
for (let i = 0; i < 20; i++) numbering.push({ reference: `steps${i}`, levels: [{
  level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
  style: { paragraph: { indent: { left: 260, hanging: 220 } } },
}] });
let listIndex = 0;
const p = (text, options = {}) => new Paragraph({
  children: [new TextRun({ text })], spacing: { after: 115 }, ...options,
});
const styles = [
  ['Title', 50, navy, true, 100], ['Heading1', 23, navy, true, 110],
  ['Subtitle', 20, gray, false, 220], ['Kicker', 16, gold, true, 120],
  ['Note', 16, gray, false, 120], ['Small', 15, gray, false, 90],
  ['Caption', 15, gray, false, 170],
].map(([id, size, color, bold, after]) => ({
  id, name: id, basedOn: 'Normal', next: 'Normal',
  run: { font: 'Arial', size, color, bold, italics: id === 'Caption' },
  paragraph: { spacing: { after }, ...(id === 'Heading1' ? { keepNext: true, outlineLevel: 0 } : {}) },
}));

const children = [];
data.pages.forEach((page, index) => {
  children.push(p(page.kicker, { style: 'Kicker', pageBreakBefore: index > 0 }));
  children.push(p(page.title, { heading: HeadingLevel.TITLE }));
  children.push(p(page.subtitle, { style: 'Subtitle' }));
  for (const block of page.blocks) {
    if (block.type === 'table') {
      const widths = block.widths.map(f => Math.round(width * f));
      widths[widths.length - 1] += width - widths.reduce((a, b) => a + b, 0);
      const border = { style: BorderStyle.SINGLE, size: 2, color: 'D6DEE7' };
      children.push(new Table({
        width: { size: width, type: WidthType.DXA }, columnWidths: widths,
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        rows: block.rows.map((row, i) => new TableRow({ tableHeader: i === 0, cantSplit: true,
          children: row.map((text, j) => new TableCell({
            width: { size: widths[j], type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: i === 0 ? navy : i % 2 ? 'F0F3F7' : 'FFFFFF' },
            borders: { bottom: border },
            children: [new Paragraph({ spacing: { after: 0, line: 230 }, children: [
              new TextRun({ text, size: 17, color: i === 0 ? 'FFFFFF' : navy, bold: i === 0 }),
            ] })],
          })),
        })),
      }));
      children.push(p('', { spacing: { after: 70, line: 50 } }));
    } else if (block.type === 'image') {
      const raw = fs.readFileSync(path.join(root, 'imagenes', block.file));
      const [iw, ih] = dimensions[block.file];
      const type = path.extname(block.file).toLowerCase() === '.jpg' ? 'jpg' : 'png';
      const w = 660 * (block.width ?? (index === 0 ? 0.88 : 1));
      children.push(new Paragraph({ keepNext: true, spacing: { before: 50, after: 0 }, children: [
        new ImageRun({ type, data: raw, transformation: { width: w, height: w * ih / iw },
          altText: { title: block.caption.split('.')[0], description: block.caption, name: block.file } }),
      ] }));
      children.push(p(block.caption, { style: 'Caption' }));
    } else if (block.type === 'link') {
      children.push(new Paragraph({ spacing: { after: 115 }, children: [new ExternalHyperlink({
        link: block.url, children: [new TextRun({ text: block.text, style: 'Hyperlink', color: '155C93' })],
      })] }));
    } else if (block.type === 'bullets' || block.type === 'steps') {
      const ref = block.type === 'bullets' ? 'bullets' : `steps${listIndex++}`;
      block.items.forEach(text => children.push(p(text, {
        numbering: { reference: ref, level: 0 }, spacing: { after: 75, line: 250 },
      })));
    } else {
      const style = { h2: 'Heading1', note: 'Note', small: 'Small' }[block.type];
      children.push(p(block.text, style ? { style } : {}));
    }
  }
});
const doc = new Document({
  creator: 'Holding Inversiones Reynaga S.A.C.', title: data.title,
  description: 'Entrega funcional y operativa de la aplicación web',
  styles: { default: { document: { run: { font: 'Arial', size: 18, color: navy },
    paragraph: { spacing: { line: 255, after: 115 } } } }, paragraphStyles: styles },
  numbering: { config: numbering },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 },
      margin: { top: 960, bottom: 920, left: 1000, right: 1000, header: 350, footer: 400 } } },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: `HOLDING REYNAGA · ENTREGA v${data.version}    |    `, size: 14, color: gray }),
        new TextRun({ children: [PageNumber.CURRENT], size: 14, color: gray }), new TextRun({ text: ` / `, size: 14, color: gray }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, color: gray })],
    })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(buffer => {
  const file = path.join(root, `Holding-Reynaga-Entrega-v${data.version}.docx`);
  fs.writeFileSync(file, buffer);
  console.log(file);
});

