import type { Locale } from '@/config/i18n';
import { categoryHref, homeHref, legalHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { getCategory } from '@/content/catalog';
import { type Product, getProductsByCategory } from '@/lib/products';
import { localizedProduct } from '@/lib/localized-content';
import { Header } from '@/components/Header';
import { BrandLockup } from '@/components/BrandLockup';
import { Footer } from '@/components/Footer';
import { ProductCard, AppCover } from '@/components/ProductCard';
import { Icon } from '@/components/Icon';

export function ProductView({ locale, product }: { locale: Locale; product: Product }) {
  const s = getStrings(locale);
  const copy = localizedProduct(locale, product);
  const category = getCategory(product.category)!;
  const categoryName = s.categoryContent[category.slug].name;
  const status = product.status === 'released' ? s.productPage.released : s.productPage.comingSoon;
  const related = getProductsByCategory(product.category).filter(p => p.slug !== product.slug);
  return <div className="site-shell" id="top" lang={locale}>
    <a className="skip-link" href="#noi-dung">{s.nav.home}</a><Header/>
    <main id="noi-dung"><div className="container">
      <nav className="breadcrumb" aria-label={s.breadcrumb}>
        <a href={homeHref(locale)}>{s.productPage.home}</a><Icon name="arrow" size={13}/>
        <a href={categoryHref(locale, category.slug)}>{categoryName}</a><Icon name="arrow" size={13}/>
        <span aria-current="page">{copy.name}</span>
      </nav>
      <section className="detail-hero" aria-labelledby="detail-heading">
        <div className="detail-main" data-reveal>
          <p className="section-eyebrow"><span>VPN DIGITAL /</span> {categoryName.toUpperCase()}</p>
          <span className="state-tag"><span className="status-dot" aria-hidden="true"/> {status.toUpperCase()}</span>
          <h1 id="detail-heading">{copy.name}<span className="accent-period">.</span></h1>
          <p className="detail-subtitle">{copy.subtitle}</p>
          <p className="detail-summary">{copy.summary}</p>
          {!product.web && <div className="availability-note detail-availability"><Icon name="clock" size={20}/><div>
            <strong>{s.productPage.availabilityTitle}</strong><p>{s.productPage.availabilityText}</p>
          </div></div>}
          <div className="hero-actions">
            {product.web
              ? <a className="button button-primary" href={product.web} target="_blank" rel="noopener noreferrer">{s.productPage.playWeb} <Icon name="external" size={17}/><span className="sr-only"> {s.common.newTab}</span></a>
              : <a className="button button-primary" href={categoryHref(locale, category.slug)}>{s.productPage.explore} {categoryName} <Icon name="arrow" size={18}/></a>}
            <a className="button button-quiet" href={homeHref(locale) + '#lien-he'}>{s.productPage.contact} <Icon name="external" size={17}/></a>
          </div>
        </div>
        <div className="detail-art detail-art-illustrated" data-reveal>
          {product.splash
            ? <span className="app-cover app-splash" style={{ background: product.splashColor }}><img src={product.splash} alt={s.productPage.splashAlt + ' ' + copy.name} loading="eager" decoding="async"/></span>
            : <AppCover product={product} alt={s.productPage.iconAlt + ' ' + copy.name} priority/>}
          <div className="visual-label"><BrandLockup variant="overlay" locale={locale}/><span className="visual-order">{status.toUpperCase()}</span></div>
        </div>
      </section>
      <section className="detail-content section" aria-labelledby="concept-heading">
        <div className="detail-story" data-reveal>
          <p className="section-eyebrow"><span>01 /</span> {s.productPage.storyEyebrow}</p>
          <h2 id="concept-heading">{s.productPage.storyTitle}<span className="accent-period">.</span></h2>
          <p className="detail-description">{copy.description}</p>
          <div className="feature-heading"><p className="section-eyebrow"><span>02 /</span> {s.productPage.featureEyebrow}</p>
            <h3>{s.productPage.featureTitle}</h3></div>
          <ol className="feature-list">{copy.features.map((feature,i)=><li key={feature}>
            <span className="feature-number">{String(i+1).padStart(2,'0')}</span><span>{feature}</span>
          </li>)}</ol>
        </div>
        <aside className="detail-aside" data-reveal>
          <p className="section-eyebrow">{s.productPage.facts}</p>
          <div className="detail-aside-status"><span className="status-dot" aria-hidden="true"/> {status}</div>
          <dl><div><dt>{s.productPage.category}</dt><dd>{categoryName}</dd></div>
            <div><dt>{s.productPage.platform}</dt><dd>{copy.platform}</dd></div>
            <div><dt>{s.productPage.statusLabel}</dt><dd>{status}</dd></div>
            <div><dt>{s.productPage.ads}</dt><dd>{product.ads ? s.productPage.yes : s.productPage.no}</dd></div></dl>
          <div className="detail-tags">{copy.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
          <p className="section-eyebrow legal-eyebrow">{s.productPage.legal}</p>
          <p className="legal-links"><a href={legalHref(locale, product.slug, 'privacy')}>{s.productPage.privacy}</a><a href={legalHref(locale, product.slug, 'terms')}>{s.productPage.terms}</a></p>
        </aside>
      </section>
      {related.length > 0 && <section className="section related-section" aria-labelledby="related-heading">
        <div className="section-header"><div><p className="section-eyebrow"><span>03 /</span> {s.productPage.relatedEyebrow}</p>
          <h2 id="related-heading">{s.productPage.relatedTitle}</h2></div>
          <a href={categoryHref(locale, category.slug)} className="inline-link">{s.productPage.all} {categoryName} <Icon name="arrow" size={17}/></a></div>
        <div className="product-grid related-products">{related.map((p,i)=><ProductCard product={p} locale={locale} key={p.slug} index={i}/>)}</div>
      </section>}
    </div></main><Footer/>
  </div>;
}
