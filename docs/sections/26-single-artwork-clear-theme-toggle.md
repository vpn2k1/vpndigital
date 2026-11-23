# V17 — One WebP per illustration in both themes, clearer theme toggle

The owner decided to keep precisely the pictures they currently see in **Light Mode** (the unsuffixed `/images/*.webp` files, after the preceding A/B swap) in **both** Light and Dark Mode.

Implementation:
- `components/Artwork.tsx` renders **one image** with `src=/images/{hero,game,software,tools}.webp` (or the corresponding product src) and `-640.webp` responsive srcSet. Neither `-light.webp` nor `-light-640.webp` is used on site surfaces.
- `app/studio.css` no longer switches illustration visibility or filter per theme. A uniform filter maintains the previous Light Mode presentation.
- Dark/Light background, text and logo icon remain theme-aware. The `ThemeToggle` icon is a solid crescent moon on light backgrounds and a bold sun on dark backgrounds, displayed in a high-contrast 44–46px tap target with accessible labels.
- `scripts/ui-smoke.mjs` checks one image per illustrated section, stable src across modes, responsive srcSet, visible correct moon/sun and screenshots of both modes.

No original binary assets were modified or deleted. Reversion is just a change to the `Artwork` component if needed. Branch is not merged to main.
