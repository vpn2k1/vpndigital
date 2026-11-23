#!/usr/bin/env python3
"""Render all selected-logo PNG, favicon and social variants from checked-in SVG.
Dependencies: pip install pillow cairosvg
"""
from pathlib import Path
from io import BytesIO
from PIL import Image
import cairosvg

root = Path(__file__).resolve().parents[1]
brand = root / 'public' / 'brand' / 'vpn-digital'
brand.mkdir(parents=True, exist_ok=True)
public = root / 'public'

def png(svg, width, height):
    return Image.open(BytesIO(cairosvg.svg2png(url=str(svg), output_width=width, output_height=height))).convert('RGBA')

for theme in ('light', 'dark'):
    png(brand / f'wordmark-{theme}.svg', 1860, 432).save(brand / f'wordmark-{theme}.png', optimize=True)

mark = png(brand / 'mark.svg', 1024, 842)
mark.save(brand / 'mark.png', optimize=True)
mark_dark = png(brand / 'mark-dark.svg', 1024, 842)
mark_dark.save(brand / 'mark-dark.png', optimize=True)

# Use a square transparent canvas so favicon never distorts the brand mark.
icon = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
small = mark.copy()
small.thumbnail((480, 438), Image.Resampling.LANCZOS)
icon.alpha_composite(small, ((512-small.width)//2, (512-small.height)//2))
icon.save(public / 'apple-touch-icon.png', optimize=True)
icon.save(brand / 'favicon-512.png', optimize=True)
for size in (16, 32, 48, 64, 192):
    icon.resize((size, size), Image.Resampling.LANCZOS).save(brand / f'favicon-{size}.png', optimize=True)
icon.save(public / 'favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64)])

# The social preview is localized, rather than embedding Vietnamese words in English pages.
# Generate both variants and keep unprefixed og-image.png as the English default.
from html import escape
from shutil import copyfile

wordmark = (brand / 'wordmark-dark.svg').read_text(encoding='utf-8')
svg_inner = wordmark[wordmark.index('>')+1:wordmark.rindex('</svg>')]
og_copies = {
    'en': {
        'company': 'PhuongNam Digital',
        'headline': 'Vietnamese technology. Digital ambition.',
        'fields': 'Apps · Software · Tools',
    },
    'vi': {
        'company': 'Công ty TNHH Một Thành Viên Công Nghệ Số Phương Nam',
        'headline': 'Công nghệ Việt. Khát vọng số.',
        'fields': 'Ứng dụng · Phần mềm · Công cụ',
    },
}
for locale, labels in og_copies.items():
    company_label = escape(labels['company'])
    headline = escape(labels['headline'])
    fields = escape(labels['fields'])
    company_font = '20' if locale == 'vi' else '24'
    og = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#07182F"/>
<circle cx="1060" cy="80" r="300" fill="#123B63" opacity=".38"/>
<circle cx="1060" cy="80" r="208" fill="#075E8E" opacity=".12"/>
<rect x="72" y="77" width="6" height="50" rx="3" fill="#18C7D7"/>
<text x="101" y="111" fill="#A3CDE3" font-family="DejaVu Sans,Arial,sans-serif" font-weight="bold" font-size="{company_font}" letter-spacing="1">{company_label}</text>
<svg x="76" y="172" width="1040" height="242" viewBox="0 0 905 216">{svg_inner}</svg>
<rect x="76" y="464" width="1046" height="1" fill="#2B5373"/>
<text x="78" y="524" fill="#E2F3FC" font-family="DejaVu Sans,Arial,sans-serif" font-weight="bold" font-size="30">{headline}</text>
<text x="80" y="564" fill="#8DADC2" font-family="DejaVu Sans,Arial,sans-serif" font-size="19">{fields}</text>
</svg>'''
    svg_path = root / 'design' / f'og-image-{locale}.svg'
    svg_path.write_text(og, encoding='utf-8')
    cairosvg.svg2png(
        bytestring=og.encode('utf-8'),
        write_to=str(public / f'og-image-{locale}.png'),
        output_width=1200,
        output_height=630,
    )

copyfile(public / 'og-image-en.png', public / 'og-image.png')
copyfile(root / 'design' / 'og-image-en.svg', root / 'design' / 'og-image.svg')
print('Rendered VPN Digital logo assets and bilingual EN/VI OG previews.')
