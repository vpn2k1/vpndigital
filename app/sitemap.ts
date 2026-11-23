import type { MetadataRoute } from 'next';
import { siteUrl, indexable } from '@/lib/seo';
import { categories } from '@/content/catalog';
import { products } from '@/lib/products';
import { locales, homeHref, categoryHref, productHref } from '@/config/i18n';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable || !siteUrl) return [];
  const all = [
    locales.map(locale => ({ locale, href: homeHref(locale), equivalent: (l: typeof locale) => homeHref(l) })),
    ...categories.map(category => locales.map(locale => ({ locale, href: categoryHref(locale, category.slug), equivalent: (l: typeof locale) => categoryHref(l, category.slug) }))),
    ...products.map(product => locales.map(locale => ({ locale, href: productHref(locale, product.slug), equivalent: (l: typeof locale) => productHref(l, product.slug) }))),
  ].flat();
  return all.map(item => ({
    url: new URL(item.href, siteUrl).href,
    alternates: { languages: { en: new URL(item.equivalent('en'), siteUrl).href, vi: new URL(item.equivalent('vi'), siteUrl).href } },
  }));
}
