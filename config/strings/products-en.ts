import data from '@/content/products-en.json';
import { validateTranslation, type TranslatedProduct } from '@/lib/product-schema';

/** The Vietnamese product catalog lives in content/products.json; English in content/products-en.json. Both are pulled from D1 at build (scripts/pull-content.mjs). */
export const productsEn: Record<string, TranslatedProduct> = data;
for (const [slug, english] of Object.entries(productsEn)) validateTranslation(slug, english);
