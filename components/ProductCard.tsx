import type { Product } from '@/lib/products';
import { getCategory } from '@/content/catalog';
import { Artwork } from './Artwork';
import { Icon } from './Icon';

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const category = getCategory(product.category);
  return <article className="product-card" data-reveal>
    <a className="product-card-link" href={'/san-pham/' + product.slug + '/'} aria-label={product.name + ' — Xem ý tưởng sắp ra mắt'}>
      <div className="product-cover">
        <Artwork src={product.image} alt={product.imageAlt} sizes="(max-width: 740px) 90vw, (max-width: 1100px) 44vw, 375px" />
        <span className="product-cover-label">CONCEPT / {String((index ?? 0) + 1).padStart(2, '0')}</span>
      </div>
      <div className="product-card-body">
        <div className="product-topline"><span>{category?.name ?? 'Dự án'}</span><span className="mini-status"><span className="status-dot" aria-hidden="true" /> Sắp ra mắt</span></div>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <div className="product-card-bottom"><span>Xem ý tưởng</span><span className="arrow-disc"><Icon name="arrow" size={19}/></span></div>
      </div>
    </a>
  </article>;
}
