import { getCategory, type CategorySlug } from '../content/catalog';

/** Public R2 bucket domain for images uploaded through /admin. */
export const MEDIA_URL = 'https://media.vpndigital.io.vn';
// visible: false hides a product from listings but keeps its policy pages online (store listings link to them).
export interface Product { slug: string; featured: boolean; visible: boolean; category: CategorySlug; name: string; subtitle: string; summary: string; description: string; features: string[]; platform: string; tags: string[]; icon: string; splash?: string; splashColor?: string; screenshots?: { src: string; caption: string }[]; status: 'demo' | 'released'; web: string; ads: boolean; online: boolean; privacy: string; updated: string; }
export type TranslatedProduct = Pick<Product, 'name' | 'subtitle' | 'summary' | 'description' | 'features' | 'platform' | 'tags' | 'privacy' | 'screenshots'>;

const isImage = (src: unknown) => typeof src === 'string' && (src.startsWith('/apps/') || src.startsWith(`${MEDIA_URL}/`));
const filled = (value: unknown) => typeof value === 'string' && !!value.trim();

/** Throws on the first invalid product. Shared by the build (lib/products.ts) and the admin API. */
export function validateProducts(list: Product[]) {
  const seen = new Set<string>();
  for (const product of list) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || seen.has(product.slug)) throw new Error(`Slug không hợp lệ hoặc trùng: ${product.slug}`);
    seen.add(product.slug);
    if (!getCategory(product.category)) throw new Error(`Category không hợp lệ: ${product.category}`);
    for (const field of ['name', 'subtitle', 'summary', 'description', 'platform', 'icon', 'privacy', 'updated'] as const) if (!filled(product[field])) throw new Error(`Thiếu ${field}: ${product.slug}`);
    if (!['demo', 'released'].includes(product.status) || !isImage(product.icon) || (product.splash && !isImage(product.splash)) || product.screenshots?.some(shot => !isImage(shot.src) || !filled(shot.caption)) || (product.web && !product.web.startsWith('https://')) || !product.features?.length || !product.tags?.length) throw new Error(`Dữ liệu không hợp lệ: ${product.slug}`);
  }
}

export function validateTranslation(slug: string, english: TranslatedProduct) {
  for (const field of ['name', 'subtitle', 'summary', 'description', 'platform', 'privacy'] as const) if (!filled(english?.[field])) throw new Error(`Thiếu bản dịch ${field}: ${slug}`);
  if (!english.features?.length || !english.tags?.length || english.screenshots?.some(shot => !isImage(shot.src) || !filled(shot.caption))) throw new Error(`Bản dịch không hợp lệ: ${slug}`);
}
