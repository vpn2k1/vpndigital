import data from '@/content/products.json';
import { validateProducts, type Product } from '@/lib/product-schema';
export type { Product } from '@/lib/product-schema';
validateProducts(data as Product[]);
export const allProducts = data as Product[];
export const products = allProducts.filter(product => product.visible);
export const getProduct = (slug: string) => allProducts.find(product => product.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
