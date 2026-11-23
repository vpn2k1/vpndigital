# VPN Digital — English / Vietnamese Internationalization

- English is the default language; loading `/` forwards to `/en/`.
- Routes are generated statically for Next.js output export; no runtime translation service or server is necessary.
- Examples: `/en/` ↔ `/vi/`, `/en/apps/` ↔ `/vi/ung-dung/`, `/en/software/` ↔ `/vi/phan-mem/`, `/en/tools/` ↔ `/vi/cong-cu/`, `/en/products/sprite-kit/` ↔ `/vi/san-pham/sprite-kit/`.
- Existing unprefixed paths forward to the Vietnamese equivalents so existing links are not stranded.
- Text dictionaries: `config/strings/en.ts` and `config/strings/vi.ts`; source Vietnamese product catalog in `content/products.json`; product English translation in `config/strings/products-en.ts`.
- Routing config / segment mapping: `config/i18n.ts`; `hooks/useLanguage.ts` uses `usePathname`, `useRouter` and a callback that preserves the content page and query/hash. URL is the source of truth; no locale cookie/localStorage.
- `components/LanguageSwitcher.tsx` in the header exposes EN / VI; document language is updated by `LanguageDocument`, and the localized route segment is wrapped with `lang={locale}`.
- Categories, product content, headers, footers, branding tagline, contact form preview and metadata are translated.
- SEO metadata provides canonical and hreflang alternates when the configured public site URL exists. Sitemap covers both locales. Root page is a non-indexable English gateway.
- The 3D artwork uses the same WebP across themes, and contact form still **clears only**, does not store or transmit anything.
- Browser smoke tests both languages, legacy routes, page-preserving language switching, form clearing, theme, imagery and mobile layouts.

Locale extension: add a dictionary, locale value, path mappings and translated product entries. This document reflects the two-locales requirement, not an auto-translation integration.
