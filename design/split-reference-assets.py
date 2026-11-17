"""Package the four exact supplied PNG regions as standalone clipped SVG assets.

The SVGs embed the source PNG so they do not depend on a relative image URL.
No pixels or artwork are regenerated. Run from the project root.
"""
from pathlib import Path
from base64 import b64encode
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'design' / 'reference'
OUT = ROOT / 'public' / 'brand' / 'theme'
OUT.mkdir(parents=True, exist_ok=True)

variants = [
    ('vpn-logo-light.svg', 'vpn-light-original.png', (77, 89, 503, 506), 75, 'Logo VPN nền sáng'),
    ('vpn-banner-light.svg', 'vpn-light-original.png', (678, 155, 1344, 346), 0, 'Banner VPN nền sáng'),
    ('vpn-logo-dark.svg', 'vpn-dark-original.png', (48, 76, 526, 528), 75, 'Logo VPN nền tối'),
    ('vpn-banner-dark.svg', 'vpn-dark-original.png', (663, 158, 1342, 367), 0, 'Banner VPN nền tối'),
]
for name, source, (x, y, w, h), radius, label in variants:
    data = b64encode((SOURCE / source).read_bytes()).decode('ascii')
    xml = (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
           f'viewBox="0 0 {w} {h}" role="img" aria-label="{escape(label)}">'
           f'<title>{escape(label)}</title><defs><clipPath id="frame"><rect width="{w}" height="{h}" rx="{radius}"/></clipPath></defs>'
           f'<image x="{-x}" y="{-y}" width="2048" height="682" '
           f'xlink:href="data:image/png;base64,{data}" clip-path="url(#frame)"/></svg>\n')
    (OUT / name).write_text(xml)
    print(name, f'{w}x{h}')
