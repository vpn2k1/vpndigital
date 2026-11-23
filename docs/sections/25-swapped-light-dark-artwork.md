# Visual A/B experiment — invert artwork between light and dark theme

Per owner request, try displaying the two uploaded illustration variants under opposite themes, **without rewriting or renaming any files**:

| Site theme | Image currently displayed | Mobile source |
| --- | --- | --- |
| Light | `/images/{hero,game,software,tools}.webp` (original dark-family image) | `-640.webp` |
| Dark | `/images/{hero,game,software,tools}-light.webp` (original bright-family image) | `-light-640.webp` |

Only the illustration pairing is swapped. Theme colors, logo icon, live VPN Digital text and navigation remain as before. Applies to hero, pillar cards, product cards, categories and detail pages through `components/Artwork.tsx`.

To revert this experiment, swap the two source/sourceSet pairs back in `components/Artwork.tsx`, update the expectations in `scripts/ui-smoke.mjs`, and remove the trial CSS comment. Browser CI captures `*-swapped-light.png` and `*-swapped-dark.png` screenshots for comparison.
