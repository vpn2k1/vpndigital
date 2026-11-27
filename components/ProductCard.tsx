import type { Product } from '@/lib/products';
import { Icon } from './Icon';
export const statusLabel = (product: Product) => product.status === 'released' ? 'ĐÃ PHÁT HÀNH' : 'SẮP RA MẮT';
export function AppCover({ product, priority = false }: { product: Product; priority?: boolean }) {
  return <span className="app-cover" style={product.splashColor ? { background: product.splashColor } : undefined}><img src={product.icon} alt={`Biểu tượng ứng dụng ${product.name}`} width={512} height={512} loading={priority ? 'eager' : 'lazy'} decoding="async" /></span>;
}
export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card launch-product-card" data-reveal><a className="product-card-link" href={`/san-pham/${product.slug}/`} aria-label={`${product.name} — Xem giới thiệu, ${statusLabel(product).toLowerCase()}`}><div className="product-cover"><AppCover product={product} /><span className="launch-card-badge"><span className="launch-dot" aria-hidden="true" /> {statusLabel(product)}</span></div><div className="product-card-body"><div className="product-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{product.name}</h3><p>{product.summary}</p><span className="product-read">Xem chi tiết <Icon name="arrow" size={18}/></span></div></a></article>;
}
