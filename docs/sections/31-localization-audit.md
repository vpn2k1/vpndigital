# V22 — End-to-end locale text audit

## Findings and fixes
- Header aria labels: navigation and open/close menu labels now use EN/VI string config instead of mixed languages.
- Theme toggle: visible title, aria-label and screen-reader text now change with the route language.
- Hero: locale-specific studio eyebrow and image corner label (VIETNAM / VIỆT NAM).
- Footer and contact: local display location is translated as `Me So, Hung Yen` / `Mễ Sở, Hưng Yên`; no duplicate location label.
- English product examples: the two localized display names are `Vietnamese Village Puzzle` and `Southern Journey`, keeping canonical product slugs and untranslated brand names in Vietnamese catalog.
- Vietnamese product descriptions/platform labels and UI sections: replace stray `concept`, `demo`, and other English UI phrases with natural Vietnamese where not a technical proper noun.
- Breadcrumb aria labels and legacy redirect fallback content are routed to `config/strings/en.ts` and `vi.ts`.
- English product translation coverage is now checked: missing entries throw an error rather than silently falling back to Vietnamese content.
- Open Graph/social previews now have separate **English** and **Vietnamese** localized PNG images (`/og-image-en.png` and `/og-image-vi.png`); the unprefixed `/og-image.png` is English by default, matching the default route.
- Previous selected logo, WebP artwork, two visual themes, EN/VI routes and React Hook Form + Zod demo form remain unchanged.

## QA
Add route-wide browser assertions for localized navigation, theme tooltip, company/location, hero labels, product names, translated descriptions and localized social preview assets. Verify desktop/mobile after static build. Do not merge to main without approval.
