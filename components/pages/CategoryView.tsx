import type { Locale } from '@/config/i18n';
import { categoryHref, homeHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { categories } from '@/content/catalog';
import { getProductsByCategory } from '@/lib/products';
import { localizedCategory } from '@/lib/localized-content';
import { Header } from '@/components/Header';
import { BrandLockup } from '@/components/BrandLockup';
import { Footer } from '@/components/Footer';
import { Artwork } from '@/components/Artwork';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { Icon } from '@/components/Icon';

export function CategoryView({ locale, slug }: { locale: Locale; slug: (typeof categories)[number]['slug'] }) {
  const s = getStrings(locale);
  const category = categories.find(c => c.slug === slug)!;
  const copy = localizedCategory(locale, category);
  const list = getProductsByCategory(category.slug);
  const index = categories.findIndex(item => item.slug === category.slug) + 1;
  return <div className="site-shell" id="top" lang={locale}>
    <a className="skip-link" href="#noi-dung">{s.nav.home}</a>
    <Header/>
    <main id="noi-dung"><div className="container">
      <nav className="breadcrumb" aria-label={s.breadcrumb}>
        <a href={homeHref(locale)}>{s.nav.home}</a><Icon name="arrow" size={13}/><span aria-current="page">{copy.name}</span>
      </nav>
      <section className="category-hero" aria-labelledby="category-heading">
        <div className="category-hero-copy" data-reveal>
          <p className="section-eyebrow"><span>0{index} /</span> {copy.eyebrow}</p>
          <div className="state-tag"><span className="status-dot" aria-hidden="true"/> {s.common.comingSoon}</div>
          <h1 id="category-heading">{copy.name}<span className="accent-period">.</span>
            <small>{copy.headline.split('\n').map((line, i) => <span key={i}>{line}</span>)}</small>
          </h1>
          <p className="category-summary">{copy.description}</p>
          <div className="availability-note"><Icon name="clock" size={20}/><p>{s.categoryPage.availability}</p></div>
          <div className="hero-actions">
            <a className="button button-primary" href="#y-tuong">{s.categoryPage.explore} <Icon name="down" size={18}/></a>
            <a className="button button-quiet" href={homeHref(locale) + '#lien-he'}>{s.categoryPage.contact} <Icon name="external" size={17}/></a>
          </div>
        </div>
        <div className="category-hero-visual category-hero-illustrated" data-reveal>
          <Artwork src={category.image} alt={copy.imageAlt} priority sizes="(max-width: 960px) 90vw, 50vw"/>
          <div className="visual-label"><BrandLockup variant="overlay" locale={locale}/><span className="visual-order">{String(index).padStart(2, '0')} / 03</span></div>
        </div>
      </section>
      <CategoryNav active={category.slug} locale={locale}/>
      <section className="category-collection section" id="y-tuong" aria-labelledby="collection-heading">
        <div className="section-header" data-reveal>
          <div><p className="section-eyebrow"><span>{s.categoryPage.collectionEyebrow}</span> {copy.name.toUpperCase()}</p>
            <h2 id="collection-heading">{s.categoryPage.collectionFirst}<br/><span>{s.categoryPage.collectionAccent}</span></h2></div>
          <p>{String(list.length).padStart(2, '0')} {s.categoryPage.collectionText}</p>
        </div>
        <div className="product-grid category-products">{list.map((product, i) => <ProductCard key={product.slug} product={product} locale={locale} index={i}/>)}</div>
      </section>
      <section className="category-end-panel">
        <div><span className="section-eyebrow">{s.categoryPage.bottomEyebrow}</span><h2>{s.categoryPage.bottomTitle}</h2>
          <p>{s.categoryPage.bottomDescription}</p></div>
        <a className="button button-primary" href={homeHref(locale) + '#lien-he'}>{s.categoryPage.bottomCta} <Icon name="arrow" size={17}/></a>
      </section>
    </div></main><Footer/>
  </div>;
}
