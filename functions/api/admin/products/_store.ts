import { validateProducts, validateTranslation, type Product, type TranslatedProduct } from '../../../../lib/product-schema';
import type { Env } from '../_lib';

export interface Entry { slug: string; vi: Product; en: TranslatedProduct }

export async function listEntries(env: Env): Promise<Entry[]> {
  const { results } = await env.DB.prepare('SELECT slug, vi, en FROM products ORDER BY sort').all<{ slug: string; vi: string; en: string }>();
  return results.map(row => ({ slug: row.slug, vi: JSON.parse(row.vi), en: JSON.parse(row.en) }));
}

/** Validates the whole catalog with the same rules the build uses, so a save can never break the next deploy. Returns an error message or null. */
export function check(entries: Entry[]) {
  try {
    validateProducts(entries.map(entry => entry.vi));
    for (const entry of entries) {
      if (entry.vi.slug !== entry.slug) throw new Error(`Slug không khớp: ${entry.slug}`);
      validateTranslation(entry.slug, entry.en);
    }
    return null;
  } catch (error) { return (error as Error).message; }
}
