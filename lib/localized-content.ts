import type { Locale } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { productsEn } from '@/config/strings/products-en';
import type { Product } from '@/lib/products';
import type { categories } from '@/content/catalog';

export function localizedCategory(locale: Locale, category: (typeof categories)[number]) {
  return { ...category, ...getStrings(locale).categoryContent[category.slug] };
}
export function localizedProduct(locale: Locale, product: Product): Product {
  return locale === 'en' && productsEn[product.slug] ? { ...product, ...productsEn[product.slug] } : product;
}
