# VPN Digital — Logo icon + editable wordmark & tagline

Selected by owner: **style 2**. Header, footer, hero, categories, and product detail brand panels show:
- The selected icon image only: `public/brand/vpn-digital/mark.svg` in light mode, `mark-dark.svg` in dark mode.
- Real HTML text **VPN Digital** beside the icon (not inside the image).
- A small secondary line: **Ứng dụng · Phần mềm · Công cụ**.

Shared component: `components/BrandLockup.tsx`, variants `header`, `footer`, `stage`.
Shared CSS: `app/studio.css`. The footer uses the icon for dark backgrounds regardless of the page theme.
The text remains searchable, selectable, readable by assistive technologies and responsive; it is not rasterized.
The archived whole-wordmark SVG/PNG files remain available as references but are not used by the live visual interface.
`scripts/ui-smoke.mjs` tests icon paths, text, tagline and theme switching.
