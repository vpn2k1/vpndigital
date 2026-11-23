# V15 — Reintroduce 3D raster images and make Light/Dark reliable

The owner explicitly requested their newly uploaded blue/cyan WebP artwork be shown again.

## Visible placements
- Homepage hero: `hero.webp` / `hero-light.webp`
- Homepage three pillars: `game.webp`, `software.webp`, `tools.webp`, with `-light` versions
- Featured/related concept cards: images from `content/products.json`, restored
- Category hero and detail hero: context-specific category/product image restored
- Responsive version: `-640.webp` and `-light-640.webp` through `srcSet`

## Brand system
`BrandLockup` remains **icon image + live text** `VPN Digital` with subheading `Ứng dụng · Phần mềm · Công cụ` in Header, Footer and overlays. The art is the owner's own uploaded binary WebP, not SVG drawings.

## Theme behavior
CSS class `theme-artwork-light` or `theme-artwork-dark` gets display:block based on explicit `html[data-theme]`, otherwise based on `prefers-color-scheme`. Only one of the pair is visible at once. Light mode gets higher local contrast and saturation; both use the existing uploaded files and keep the original image composition.

## QA
Chromium checks all existing routes on desktop/mobile, verifies light and dark filename, display of correct image, and decodability. It still verifies real HTML text in the Header. CI produces screenshots for manual review, no merge to main.
