# V12 — VPN Digital / Orbit Studio: full website redesign

## Goal
Rebuild the site as a coherent tech/product-studio experience rather than stacking incremental themes. Design for credibility, clarity, original 3D imagery, responsive rhythm and transparent product availability.

## UX decisions
- One design system (`app/studio.css`), no old CSS imports at runtime, to avoid accumulated conflicting rules.
- Strong hero hierarchy, explicit navigation to services/projects/company/contact, paired light/dark imagery chosen by the site owner, selected blue-cyan VPN logo.
- Clear distinction between company information and **concepts not yet released**. Never invent product downloads, forms, customers, reviews, launch dates or functionality.
- Category pages use descriptive headline and artwork + concept list; detail pages explain intended features and state product unavailability.
- Content remains managed in existing TypeScript/JSON, URL structure remains unchanged.
- Responsive layouts for 390 / 768 / 1024 / 1440, semantic landmarks, meaningful link labels, keyboard focus, reduced motion, direct links to product routes.

## Components
- Header: selected logo, nav, single theme button, mobile menu.
- Home: studio hero / editorial categories / featured concepts / creative approach / verified company profile / contact.
- Category: coming-soon editorial hero, category tabs, concepts, honest availability notice.
- Product: large feature hero, availability block, numbered intended capabilities, facts and related concepts.
- Footer: useful navigation and legitimate company information.
- Illustrations: existing owner-updated WebP pairs, dark and light; no SVG recreation of raster imagery.

## QA
GitHub Actions runs `npm ci`, `npm run typecheck`, `npm run build` and Playwright route/image/theme/overflow checks. Review screenshots before merging.
