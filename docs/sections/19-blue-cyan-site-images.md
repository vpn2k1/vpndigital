# VPN Digital — blue/cyan image palette

The four **live** image families are recolored to match the chosen navy/royal-blue/cyan logo:

- `public/images/hero.webp` and `hero-640.webp`
- `public/images/game.webp` and `game-640.webp`
- `public/images/software.webp` and `software-640.webp`
- `public/images/tools.webp` and `tools-640.webp`

Recoloring preserves image composition, layout, luminance and all recognizable objects, while remapping the palette to dark blue / bright blue / cyan. The first CI run saves untouched originals to `public/images/source/`; future runs always regenerate from these originals, avoiding color drift.

The selected logo, favicon and OG image are already blue/cyan and are not recolored. Obsolete archival branding in `public/brand/theme/` is not used by live pages and is not modified.

Rebuild: `python -m pip install pillow && python scripts/recolor_site_images.py`.
