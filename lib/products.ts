import data from '@/content/products.json';
import { getCategory, type CategorySlug } from '@/content/catalog';
// visible: false hides a product from listings but keeps its policy pages online (store listings link to them).
export interface Product { slug: string; featured: boolean; visible: boolean; category: CategorySlug; name: string; subtitle: string; summary: string; description: string; features: string[]; platform: string; tags: string[]; icon: string; splash?: string; splashColor?: string; status: 'demo' | 'released'; web: string; packageId: string; ads: boolean; online: boolean; privacy: string; updated: string; }
const seen = new Set<string>();
for (const product of data as Product[]) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || seen.has(product.slug)) throw new Error(`Slug không hợp lệ hoặc trùng: ${product.slug}`);
  seen.add(product.slug);
  if (!getCategory(product.category)) throw new Error(`Category không hợp lệ: ${product.category}`);
  for (const field of ['name', 'subtitle', 'summary', 'description', 'platform', 'icon', 'privacy', 'updated'] as const) if (!product[field]?.trim()) throw new Error(`Thiếu ${field}: ${product.slug}`);
  if (!['demo', 'released'].includes(product.status) || !product.icon.startsWith('/apps/') || (product.splash && !product.splash.startsWith('/apps/')) || (product.web && !product.web.startsWith('https://')) || (product.packageId && !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/.test(product.packageId)) || !product.features.length || !product.tags.length) throw new Error(`Dữ liệu không hợp lệ: ${product.slug}`);
}
export const allProducts = data as Product[];
export const products = allProducts.filter(product => product.visible);
export const getProduct = (slug: string) => allProducts.find(product => product.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
