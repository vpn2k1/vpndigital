import type { Product } from '@/lib/products';
import { Artwork } from './Artwork';
import { Icon } from './Icon';
export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card launch-product-card" data-reveal><a className="product-card-link" href={`/san-pham/${product.slug}/`} aria-label={`${product.name} — Xem giới thiệu, sắp ra mắt`}><div className="product-cover"><Artwork src={product.image} alt={product.imageAlt} sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 45vw, 370px" /><span className="launch-card-badge"><span className="launch-dot" aria-hidden="true" /> SẮP RA MẮT</span></div><div className="product-card-body"><div className="product-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{product.name}</h3><p>{product.summary}</p><span className="product-read">Xem ý tưởng <Icon name="arrow" size={18}/></span></div></a></article>;
}
