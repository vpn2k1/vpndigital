# V11 — Original matched illustrations for light and dark themes

Replaces the previous color-shift-only workflow, which could not make the images resemble the requested visual references.

Four original 3D-inspired vector compositions, each with two theme-specific renderings:

- Hero: digital globe, cyan orbital ring, technology grid
- Game: luminous blue game controller, pixel shapes
- Software: workstation display with UI panels and charts
- Tools: open toolbox with wrench, gear, screwdriver

Generated SVG sources: `public/images/{hero,game,software,tools}-{light,dark}.svg`.
Generated WebP: `public/images/{hero,game,software,tools}.webp` (dark), `*-640.webp` (dark mobile), `*-light.webp` and `*-light-640.webp` (bright light mode).

`components/Artwork.tsx` renders both matched images with a CSS theme switch; `app/theme-artwork.css` respects manual `data-theme` and OS preference. No layout shift between modes. Dark images have navy background and cyan glow; light images have pale ice blue/white backgrounds and more restrained saturation. No fake screenshots, stock imagery or external image service.

Rebuild: `python -m pip install pillow cairosvg && python scripts/render_theme_illustrations.py`. GitHub Actions regenerates and commits images before build and Chromium checks. Original older images in `public/images/source` are kept for recovery but no longer used.
