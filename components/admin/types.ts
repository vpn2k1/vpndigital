import type { Product, TranslatedProduct } from '@/lib/product-schema';

export interface Entry { slug: string; vi: Product; en: TranslatedProduct }
export interface Me { email: string; role: 'admin' | 'editor' }
export interface PublishState { publishedAt: string | null; changedAt: string | null; pending: boolean }

// Every editable field, so optional ones missing from a product still show up in the form.
export const viTemplate: Product = { slug: '', category: 'ung-dung', name: '', subtitle: '', summary: '', description: '', features: [''], platform: '', tags: [''], icon: '', splash: '', splashColor: '', screenshots: [], featured: false, visible: true, status: 'demo', web: '', ads: false, online: false, privacy: '', updated: new Date().toISOString().slice(0, 10) };
export const enTemplate: TranslatedProduct = { name: '', subtitle: '', summary: '', description: '', features: [''], platform: '', tags: [''], screenshots: [], privacy: '' };

// Optional fields left empty in the form are dropped so validation does not see empty strings.
const optional = ['splash', 'splashColor', 'screenshots'];
export const tidy = <T extends object>(item: T) => Object.fromEntries(Object.entries(item).filter(([key, value]) => !(optional.includes(key) && (value === '' || (Array.isArray(value) && !value.length))))) as T;
