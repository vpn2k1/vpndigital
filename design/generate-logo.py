"""Generate the PhuongNam Digital SVG identity from one vector mark.

Requires fontTools for Be Vietnam Pro outlines. Run from the project root.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'brand'
OUT.mkdir(parents=True, exist_ok=True)
FONT_DIR = ROOT / 'node_modules' / '@fontsource' / 'be-vietnam-pro' / 'files'
RED, DARK, GOLD, IVORY = '#B51F24', '#771B20', '#B58B45', '#FCF8EF'

# Three geometric lotus petals and a downward compass stroke; 96x96 master grid.
PETALS = (
    'M48 12 62 35 48 56 34 35Z',
    'M13 30 28 31 47 53 35 72C23 63 15 48 13 30Z',
    'M83 30 68 31 49 53 61 72C73 63 81 48 83 30Z',
    'M26 69C39 79 57 79 70 69L74 75C59 89 37 89 22 75Z',
)

def mark(fill_red=RED, fill_dark=DARK, fill_gold=GOLD):
    colors = (fill_gold, fill_red, fill_red, fill_dark)
    return ''.join(f'<path d="{path}" fill="{color}"/>' for path, color in zip(PETALS, colors))

def svg(viewbox, body, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" '
            f'aria-label="{escape(label)}"><title>{escape(label)}</title>{body}</svg>\n')

def write(name, viewbox, body, label='PhuongNam Digital'):
    (OUT / name).write_text(svg(viewbox, body, label), encoding='utf-8')

fonts = {
    700: TTFont(FONT_DIR / 'be-vietnam-pro-latin-700-normal.woff'),
    500: TTFont(FONT_DIR / 'be-vietnam-pro-latin-500-normal.woff'),
}

def outlined_text(value, weight, size, x, baseline, color, tracking=0):
    font = fonts[weight]
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font['head'].unitsPerEm
    cursor = 0.0
    parts = []
    for letter in value:
        name = cmap[ord(letter)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        path = pen.getCommands()
        if path:
            parts.append(f'<path d="{path}" transform="translate({x + cursor:.2f} {baseline:.2f}) scale({scale:.5f} {-scale:.5f})" fill="{color}"/>')
        cursor += font['hmtx'][name][0] * scale + tracking
    return ''.join(parts), cursor - tracking

name, name_width = outlined_text('PhuongNam', 700, 34, 0, 0, DARK, -.75)
sub, sub_width = outlined_text('DIGITAL', 500, 14, 0, 0, RED, 2.2)

def text_lockup(x, name_y, sub_y, name_color=DARK, sub_color=RED):
    top, _ = outlined_text('PhuongNam', 700, 34, x, name_y, name_color, -.75)
    bottom, _ = outlined_text('DIGITAL', 500, 14, x + 2, sub_y, sub_color, 2.2)
    return top + bottom

write('logo-mark.svg', '0 0 96 96', mark(), 'Biểu tượng PhuongNam Digital')
write('logo-mark-footer.svg', '0 0 96 96', mark(IVORY, IVORY, GOLD), 'Biểu tượng PhuongNam Digital âm bản')
write('logo-horizontal.svg', '0 0 390 96', f'<g transform="translate(0 0)">{mark()}</g>' + text_lockup(112, 47, 72))
write('logo-horizontal-reverse.svg', '0 0 390 96', mark(IVORY, IVORY, GOLD) + text_lockup(112, 47, 72, IVORY, IVORY))
write('logo-one-color.svg', '0 0 390 96', mark(DARK, DARK, DARK) + text_lockup(112, 47, 72, DARK, DARK))
mark_x = 150 - 48
name_x = (300 - name_width) / 2
sub_x = (300 - sub_width) / 2
name_svg, _ = outlined_text('PhuongNam', 700, 34, name_x, 140, DARK, -.75)
sub_svg, _ = outlined_text('DIGITAL', 500, 14, sub_x, 168, RED, 2.2)
write('logo-stacked.svg', '0 0 300 184', f'<g transform="translate({mark_x} 0)">{mark()}</g>' + name_svg + sub_svg)
write('logo-icon-on-red.svg', '0 0 96 96', f'<rect width="96" height="96" rx="16" fill="{DARK}"/><g transform="translate(12 12) scale(.75)">{mark(IVORY, IVORY, GOLD)}</g>', 'Biểu tượng PhuongNam Digital trên nền đỏ')
(ROOT / 'public' / 'favicon.svg').write_text(svg('0 0 96 96', f'<rect width="96" height="96" rx="16" fill="{DARK}"/><g transform="translate(12 12) scale(.75)">{mark(IVORY, IVORY, GOLD)}</g>', 'PhuongNam Digital'), encoding='utf-8')

# Brand review sheet keeps all artwork embedded, suitable for printing or quick inspection.
def sample(x, y, label, body):
    return f'<text x="{x}" y="{y}" fill="{DARK}" font-family="Arial,sans-serif" font-size="17" font-weight="bold">{label}</text>' + body
sheet = f'<rect width="1200" height="860" fill="{IVORY}"/>'
sheet += '<text x="70" y="75" fill="#771B20" font-family="Arial,sans-serif" font-size="34" font-weight="bold">PhuongNam Digital</text>'
sheet += '<text x="70" y="108" fill="#70645B" font-family="Arial,sans-serif" font-size="16">Bộ logo thương hiệu • phiên bản 01</text>'
sheet += sample(70, 180, 'Logo ngang · nền sáng', f'<g transform="translate(70 205)">{mark()}{text_lockup(112,47,72)}</g>')
sheet += sample(620, 180, 'Logo dọc', f'<g transform="translate(710 210)"><g transform="translate({mark_x} 0)">{mark()}</g>{name_svg}{sub_svg}</g>')
sheet += f'<rect x="0" y="430" width="1200" height="300" fill="{DARK}"/>'
sheet += '<text x="70" y="485" fill="#FCF8EF" font-family="Arial,sans-serif" font-size="17" font-weight="bold">Logo âm bản · nền đỏ đậm</text>'
sheet += f'<g transform="translate(70 515)">{mark(IVORY, IVORY, GOLD)}{text_lockup(112,47,72,IVORY,IVORY)}</g>'
sheet += f'<g transform="translate(760 520) scale(1.35)">{mark(IVORY, IVORY, GOLD)}</g>'
sheet += '<text x="70" y="800" fill="#70645B" font-family="Arial,sans-serif" font-size="16">Đỏ ruby #B51F24  •  Đỏ đậm #771B20  •  Vàng đồng #B58B45  •  Ngà #FCF8EF</text>'
(ROOT / 'brand' / 'logo-sheet.svg').write_text(svg('0 0 1200 860', sheet, 'Bảng xem trước logo PhuongNam Digital'), encoding='utf-8')

og = f'<rect width="1200" height="630" fill="{IVORY}"/><path d="M64 477H1136" stroke="{GOLD}" stroke-width="2"/>'
og += f'<g transform="translate(54 36) scale(.75)">{mark()}</g>' + text_lockup(140, 89, 113)
og += '<text x="64" y="283" font-family="Be Vietnam Pro, Arial, sans-serif" font-size="72" font-weight="700" fill="#771B20">Công nghệ Việt.</text>'
og += '<text x="64" y="382" font-family="Be Vietnam Pro, Arial, sans-serif" font-size="72" font-weight="700" fill="#B51F24">Khát vọng số.</text>'
og += '<text x="64" y="548" font-family="Arial, sans-serif" font-size="22" fill="#70645B">CÔNG NGHỆ SỐ PHƯƠNG NAM</text>'
og += f'<g transform="translate(858 234) scale(2)">{mark()}</g>'
(ROOT / 'design' / 'og-image.svg').write_text(svg('0 0 1200 630', og, 'PhuongNam Digital — Công nghệ Việt. Khát vọng số.'), encoding='utf-8')
print('Generated brand SVGs and OG source')
