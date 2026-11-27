import type { Locale } from '@/config/i18n';
import { productHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import type { Product } from '@/lib/products';
import { getCategory } from '@/content/catalog';
import { localizedProduct } from '@/lib/localized-content';
import { Icon } from './Icon';

export function AppCover({ product, alt, priority = false }: { product: Product; alt: string; priority?: boolean }) {
  return <span className="app-cover" style={product.splashColor ? { background: product.splashColor } : undefined}>
    <img src={product.icon} alt={alt} width={512} height={512} loading={priority ? 'eager' : 'lazy'} decoding="async"/>
  </span>;
}

export function ProductCard({ product, locale, index }: { product: Product; locale: Locale; index?: number }) {
  const category = getCategory(product.category);
  const copy = localizedProduct(locale, product);
  const s = getStrings(locale);
  return <article className="product-card" data-reveal>
    <a className="product-card-link" href={productHref(locale, product.slug)}
      aria-label={copy.name + ' — ' + s.productPage.teaser}>
      <div className="product-cover">
        <AppCover product={product} alt={s.productPage.iconAlt + ' ' + copy.name}/>
        <span className="product-cover-label">{copy.platform.toUpperCase()} / {String((index ?? 0) + 1).padStart(2, '0')}</span>
      </div>
      <div className="product-card-body">
        <div className="product-topline"><span>{category ? s.categoryContent[category.slug].name : ''}</span>
          <span className="mini-status"><span className="status-dot" aria-hidden="true"/> {product.status === 'released' ? s.common.released : s.common.comingSoon}</span>
        </div>
        <h3>{copy.name}</h3>
        <p>{copy.summary}</p>
        <div className="product-card-bottom"><span>{s.common.readMore}</span><span className="arrow-disc"><Icon name="arrow" size={19}/></span></div>
      </div>
    </a>
  </article>;
}
