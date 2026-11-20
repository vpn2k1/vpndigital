#!/usr/bin/env python3
"""Generate small, transparent WebP UI icons from the site's original 24px line glyphs.
Run: python3 scripts/generate_ui_icons.py  (requires cairosvg, pillow)
"""
from io import BytesIO
from pathlib import Path
import cairosvg
from PIL import Image

ICONS = {
    "arrow": '<path d="M4 12h15M13 5l7 7-7 7"/>',
    "up": '<path d="M12 20V4M5 11l7-7 7 7"/>',
    "down": '<path d="M12 4v16M5 13l7 7 7-7"/>',
    "external": '<path d="M14 4h6v6M20 4 9 15M10 4H4v16h16v-6"/>',
    "pin": '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    "game": '<path d="M8 6h8c3 0 4 3 5 7l1 5c0 2-2 3-4 1l-3-3H9l-3 3c-2 2-4 1-4-1l1-5c1-4 2-7 5-7Z"/><path d="M6 10v4M4 12h4M16 10h.1M19 13h.1"/>',
    "code": '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 7l-3 3 3 3M16 7l3 3-3 3M13 7l-2 6M8 21h8M12 17v4"/>',
    "layers": '<path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>',
    "phone": '<path d="m7 2 3 5-3 3c2 3 4 5 7 7l3-3 5 3-2 4C10 23 1 14 2 4l5-2Z"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "sparkle": '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
}
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "icons"
OUTPUT.mkdir(parents=True, exist_ok=True)
for name, paths in ICONS.items():
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" '
        'width="128" height="128" fill="none" stroke="white" stroke-width="1.9" '
        'stroke-linecap="round" stroke-linejoin="round">' + paths + "</svg>"
    )
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=128, output_height=128)
    image = Image.open(BytesIO(png)).convert("RGBA")
    image.save(OUTPUT / (name + ".webp"), "WEBP", lossless=True, method=6)
print(f"Generated {len(ICONS)} icons to {OUTPUT}")
