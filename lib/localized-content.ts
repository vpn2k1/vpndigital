import type { Locale } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { productsEn } from '@/config/strings/products-en';
import type { Product } from '@/lib/products';
import type { categories } from '@/content/catalog';

export function localizedCategory(locale: Locale, category: (typeof categories)[number]) {
  return { ...category, ...getStrings(locale).categoryContent[category.slug] };
}
export function localizedProduct(locale: Locale, product: Product): Product {
  if (locale !== 'en') return product;
  const english = productsEn[product.slug];
  if (!english) throw new Error(`Missing English content translation for product ${product.slug}`);
  return { ...product, ...english };
}
