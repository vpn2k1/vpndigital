import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, allProducts } from '@/lib/products';
import { localizedProduct } from '@/lib/localized-content';
import { isLocale, locales, legalDocs, legalSegments, legalHref, legalFromPathSegment } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { siteUrl } from '@/lib/seo';
import { LegalView } from '@/components/pages/LegalView';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap(locale => allProducts.flatMap(p => legalDocs.map(doc => ({
    locale, category: locale === 'en' ? 'products' : 'san-pham', slug: p.slug, doc: legalSegments[locale][doc],
  }))));
}
type Params = { locale: string; category: string; slug: string; doc: string };
async function resolve(params: Promise<Params>) {
  const { locale, category, slug, doc: segment } = await params;
  if (!isLocale(locale) || category !== (locale === 'en' ? 'products' : 'san-pham')) return;
  const product = getProduct(slug);
  const doc = legalFromPathSegment(locale, segment);
  return product && doc ? { locale, product, doc } : undefined;
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const s = getStrings(r.locale).productPage;
  const name = localizedProduct(r.locale, r.product).name;
  const title = (r.doc === 'privacy' ? s.privacy : s.terms) + ' — ' + name + ' | VPN Digital';
  return { title, description: title,
    ...(siteUrl ? { alternates: { canonical: legalHref(r.locale, r.product.slug, r.doc), languages: { en: legalHref('en', r.product.slug, r.doc), vi: legalHref('vi', r.product.slug, r.doc) } } } : {}) };
}
export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const r = await resolve(params);
  if (!r) notFound();
  return <LegalView {...r}/>;
}
