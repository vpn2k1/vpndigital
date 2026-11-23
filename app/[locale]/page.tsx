import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, homeHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { siteUrl } from '@/lib/seo';
import { HomeView } from '@/components/pages/HomeView';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const s = getStrings(locale);
  const title = 'VPN Digital | ' + s.brand.tagline;
  const description = s.hero.description;
  return {
    title, description, openGraph: { title, description, locale: locale === 'en' ? 'en_US' : 'vi_VN',
      ...(siteUrl ? { url: homeHref(locale), images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VPN Digital' }] } : {}) },
    ...(siteUrl ? { alternates: { canonical: homeHref(locale), languages: { en: homeHref('en'), vi: homeHref('vi') } } } : {}),
  };
}
export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomeView locale={locale}/>;
}
