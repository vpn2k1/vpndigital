import { LegacyRedirect } from '@/components/LegacyRedirect';
import { allProducts as products } from '@/lib/products';

export const dynamicParams = false;
export function generateStaticParams() { return products.map(product => ({ slug: product.slug })); }
export default async function LegacyProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LegacyRedirect to={'/vi/san-pham/' + slug + '/'} />;
}
