import data from '@/content/products.json';
import { getCategory, type CategorySlug } from '@/content/catalog';
export interface Product { slug: string; featured: boolean; category: CategorySlug; name: string; subtitle: string; summary: string; description: string; features: string[]; platform: string; tags: string[]; image: string; imageAlt: string; status: 'demo' | 'released'; }
const seen = new Set<string>();
for (const product of data) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || seen.has(product.slug)) throw new Error(`Slug không hợp lệ hoặc trùng: ${product.slug}`);
  seen.add(product.slug);
  if (!getCategory(product.category)) throw new Error(`Category không hợp lệ: ${product.category}`);
  for (const field of ['name', 'subtitle', 'summary', 'description', 'platform', 'image', 'imageAlt'] as const) if (!product[field]?.trim()) throw new Error(`Thiếu ${field}: ${product.slug}`);
  if (!['demo', 'released'].includes(product.status) || !product.image.startsWith('/images/') || !product.features.length || !product.tags.length) throw new Error(`Dữ liệu không hợp lệ: ${product.slug}`);
}
export const products = data as Product[];
export const getProduct = (slug: string) => products.find(product => product.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
