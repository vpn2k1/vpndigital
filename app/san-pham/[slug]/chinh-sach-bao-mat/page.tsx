import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts, getProduct } from '@/lib/products';
import { siteUrl } from '@/lib/seo';
import { LegalPage } from '@/components/LegalPage';
export const dynamicParams = false;
export function generateStaticParams() { return allProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `Chính sách quyền riêng tư — ${p.name} | PhuongNam Digital`, description: `Chính sách quyền riêng tư của ứng dụng ${p.name}.`, ...(siteUrl ? { alternates: { canonical: `/san-pham/${p.slug}/chinh-sach-bao-mat/` } } : {}) } : {};
}
export default async function PrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  // privacy HTML is authored in content/products.json (trusted repo content)
  return <LegalPage product={product} title="Chính sách quyền riêng tư"><div dangerouslySetInnerHTML={{ __html: product.privacy }} /></LegalPage>;
}
