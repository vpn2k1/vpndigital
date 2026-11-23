import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';
import { localizedProduct } from '@/lib/localized-content';
import { isLocale, locales, productHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { siteUrl } from '@/lib/seo';
import { ProductView } from '@/components/pages/ProductView';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap(locale => products.map(p => ({
    locale, category: locale === 'en' ? 'products' : 'san-pham', slug: p.slug,
  })));
}
type Params = { locale: string; category: string; slug: string };
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category, slug } = await params;
  if (!isLocale(locale) || category !== (locale === 'en' ? 'products' : 'san-pham')) return {};
  const original = getProduct(slug);
  if (!original) return {};
  const product = localizedProduct(locale, original);
  const title = product.name + ' — ' + getStrings(locale).common.comingSoon + ' | VPN Digital';
  const description = product.summary;
  return {
    title, description,
    openGraph: { title, description, locale: locale === 'en' ? 'en_US' : 'vi_VN',
      ...(siteUrl ? { url: productHref(locale, slug), images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VPN Digital' }] } : {}) },
    ...(siteUrl ? { alternates: { canonical: productHref(locale, slug), languages: { en: productHref('en', slug), vi: productHref('vi', slug) } } } : {}),
  };
}
export default async function LocalizedProduct({ params }: { params: Promise<Params> }) {
  const { locale, category, slug } = await params;
  if (!isLocale(locale) || category !== (locale === 'en' ? 'products' : 'san-pham')) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView locale={locale} product={product}/>;
}
