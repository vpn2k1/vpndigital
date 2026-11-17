"""Compose the light VPN banner into the social sharing image."""
from pathlib import Path
from base64 import b64encode
root = Path(__file__).resolve().parents[1]
image = b64encode((root / 'public/brand/theme/vpn-banner-light.png').read_bytes()).decode('ascii')
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
<title>PhuongNam Digital — Công nghệ Việt. Khát vọng số.</title>
<rect width="1200" height="630" fill="#FCF8EF"/>
<image x="72" y="58" width="1056" height="272" href="data:image/png;base64,{image}"/>
<path d="M72 376H1128" stroke="#B58B45" stroke-width="2"/>
<text x="72" y="472" font-family="Be Vietnam Pro, Arial, sans-serif" font-size="56" font-weight="700" fill="#771B20">Công nghệ Việt. Khát vọng số.</text>
<text x="72" y="548" font-family="Arial, sans-serif" font-size="22" fill="#70645B">PHUONGNAM DIGITAL · HƯNG YÊN, VIỆT NAM</text>
</svg>\n'''
(root / 'design/og-image.svg').write_text(svg)
