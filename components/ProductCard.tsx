import type { Locale } from '@/config/i18n';
import { productHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import type { Product } from '@/lib/products';
import { getCategory } from '@/content/catalog';
import { localizedProduct } from '@/lib/localized-content';
import { Artwork } from './Artwork';
import { Icon } from './Icon';

export function ProductCard({ product, locale, index }: { product: Product; locale: Locale; index?: number }) {
  const category = getCategory(product.category);
  const copy = localizedProduct(locale, product);
  const s = getStrings(locale);
  return <article className="product-card" data-reveal>
    <a className="product-card-link" href={productHref(locale, product.slug)}
      aria-label={copy.name + ' — ' + s.productPage.teaser}>
      <div className="product-cover">
        <Artwork src={product.image} alt={copy.imageAlt} sizes="(max-width: 740px) 90vw, (max-width: 1100px) 44vw, 375px"/>
        <span className="product-cover-label">{s.common.concept} / {String((index ?? 0) + 1).padStart(2, '0')}</span>
      </div>
      <div className="product-card-body">
        <div className="product-topline"><span>{category ? s.categoryContent[category.slug].name : s.common.concept}</span>
          <span className="mini-status"><span className="status-dot" aria-hidden="true"/> {s.common.comingSoon}</span>
        </div>
        <h3>{copy.name}</h3>
        <p>{copy.summary}</p>
        <div className="product-card-bottom"><span>{s.common.readMore}</span><span className="arrow-disc"><Icon name="arrow" size={19}/></span></div>
      </div>
    </a>
  </article>;
}
