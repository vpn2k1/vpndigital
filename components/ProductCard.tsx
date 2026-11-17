import type { Product } from '@/lib/products';
import { Artwork } from './Artwork';
import { Icon } from './Icon';
export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card" data-reveal><a className="product-card-link" href={`/san-pham/${product.slug}/`}><div className="product-cover"><Artwork src={product.image} alt={product.imageAlt} sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 45vw, 370px" />{product.status === 'demo' && <span className="demo-badge">DEMO</span>}</div><div className="product-card-body"><div className="product-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{product.name}</h3><p>{product.summary}</p><span className="product-read">Xem chi tiết <Icon name="arrow" size={18}/></span></div></a></article>;
}
