import type { MetadataRoute } from 'next';
import { siteUrl, indexable } from '@/lib/seo';
import { categories } from '@/content/catalog';
import { products } from '@/lib/products';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable && siteUrl ? ['/', ...categories.map(c => `/${c.slug}/`), ...products.flatMap(p => [`/san-pham/${p.slug}/`, `/san-pham/${p.slug}/chinh-sach-bao-mat/`, `/san-pham/${p.slug}/dieu-khoan/`])].map(path => ({ url: new URL(path, siteUrl).href })) : [];
}
