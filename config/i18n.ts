import type { CategorySlug } from '@/content/catalog';

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const isLocale = (value: string): value is Locale => value === 'en' || value === 'vi';

export const categorySegments: Record<Locale, Record<CategorySlug, string>> = {
  en: { 'ung-dung': 'apps', 'phan-mem': 'software', 'cong-cu': 'tools' },
  vi: { 'ung-dung': 'ung-dung', 'phan-mem': 'phan-mem', 'cong-cu': 'cong-cu' },
};
export const categorySlugs: CategorySlug[] = ['ung-dung', 'phan-mem', 'cong-cu'];
export const homeHref = (locale: Locale) => '/' + locale + '/';
export const categoryHref = (locale: Locale, category: CategorySlug) => '/' + locale + '/' + categorySegments[locale][category] + '/';
export const productHref = (locale: Locale, slug: string) => '/' + locale + '/' + (locale === 'en' ? 'products' : 'san-pham') + '/' + slug + '/';

export function categoryFromPathSegment(locale: Locale, segment: string): CategorySlug | undefined {
  return categorySlugs.find(slug => categorySegments[locale][slug] === segment);
}
export function languageFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first ?? '') ? first as Locale : defaultLocale;
}
/** Preserve the current category or product while changing only its locale. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const previous = isLocale(segments[0] ?? '') ? segments.shift() as Locale : 'vi';
  const first = segments[0] ?? '';
  if (!first) return homeHref(next);
  const category = categoryFromPathSegment(previous, first)
    ?? categoryFromPathSegment(next, first)
    ?? categorySlugs.find(slug => slug === first);
  if (category) return categoryHref(next, category);
  if ((first === 'products' || first === 'san-pham') && segments[1]) return productHref(next, segments[1]);
  if (first === 'game') return categoryHref(next, 'ung-dung');
  return homeHref(next);
}
