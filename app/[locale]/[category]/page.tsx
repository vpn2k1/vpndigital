import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories } from '@/content/catalog';
import { isLocale, locales, categorySegments, categoryFromPathSegment, categoryHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { siteUrl } from '@/lib/seo';
import { CategoryView } from '@/components/pages/CategoryView';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap(locale => categories.map(cat => ({ locale, category: categorySegments[locale][cat.slug] })));
}
type Params = { locale: string; category: string };
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale)) return {};
  const slug = categoryFromPathSegment(locale, category);
  if (!slug) return {};
  const copy = getStrings(locale).categoryContent[slug];
  const title = copy.name + ' — ' + getStrings(locale).common.comingSoon + ' | VPN Digital';
  const description = copy.description;
  return {
    title, description,
    openGraph: { title, description, locale: locale === 'en' ? 'en_US' : 'vi_VN',
      ...(siteUrl ? { url: categoryHref(locale, slug), images: [{ url: '/og-image-' + locale + '.png', width: 1200, height: 630, alt: 'VPN Digital' }] } : {}) },
    ...(siteUrl ? { alternates: { canonical: categoryHref(locale, slug), languages: { en: categoryHref('en', slug), vi: categoryHref('vi', slug) } } } : {}),
  };
}
export default async function LocalizedCategory({ params }: { params: Promise<Params> }) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();
  const slug = categoryFromPathSegment(locale, category);
  if (!slug) notFound();
  return <CategoryView locale={locale} slug={slug}/>;
}
