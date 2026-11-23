import type { Locale } from '@/config/i18n';
import { categoryHref, homeHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { Header } from '@/components/Header';
import { Artwork } from '@/components/Artwork';
import { BrandLockup } from '@/components/BrandLockup';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { products } from '@/lib/products';
import { categories } from '@/content/catalog';
import { company } from '@/content/company';
import { localizedCategory } from '@/lib/localized-content';
import { siteUrl } from '@/lib/seo';

const organization = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: company.internationalName, alternateName: company.shortName,
  ...(siteUrl ? { url: siteUrl.href } : {}),

};

export function HomeView({ locale }: { locale: Locale }) {
  const s = getStrings(locale);
  const featured = products.filter(product => product.featured).slice(0, 3);
  const home = homeHref(locale);
  return <div id="top" className="site-shell" lang={locale}>
    <a href="#noi-dung" className="skip-link">{s.nav.home}</a>
    <Header/>
    <main id="noi-dung">
      <section className="container home-hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line"/> {s.hero.eyebrow} <span className="eyebrow-muted">{s.hero.location}</span></p>
          <span className="hero-status"><span className="status-dot" aria-hidden="true"/> {s.hero.status}</span>
          <h1 id="hero-heading">{s.hero.first}<br/><span>{s.hero.accent}</span><br/>{s.hero.last}</h1>
          <p className="hero-description">{s.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#du-an">{s.hero.explore} <Icon name="arrow" size={19}/></a>
            <a className="button button-quiet" href="#gioi-thieu">{s.hero.about} <Icon name="down" size={17}/></a>
          </div>
          <div className="hero-meta"><span><strong>03</strong> {s.hero.fields}</span><span className="meta-divider"/><span><strong>06</strong> {s.hero.ideas}</span><span className="meta-divider"/><span><strong>∞</strong> {s.hero.possibilities}</span></div>
        </div>
        <div className="hero-visual hero-visual-illustrated" data-reveal>
          <Artwork src="/images/hero.webp" alt={s.hero.artwork} priority sizes="(max-width: 960px) 92vw, 50vw"/>
          <div className="hero-visual-top"><span className="visual-cross" aria-hidden="true">VPN</span><span>VPN DIGITAL / VIETNAM</span></div>
          <div className="hero-visual-caption"><BrandLockup variant="overlay" locale={locale}/></div>
        </div>
      </section>

      <div className="container ticker-wrap" aria-label={s.ticker.status}>
        <span className="ticker-lead"><span className="status-dot" aria-hidden="true"/> {s.ticker.status}</span>
        <span>{s.ticker.apps}</span><span className="ticker-separator" aria-hidden="true">/</span>
        <span>{s.ticker.software}</span><span className="ticker-separator" aria-hidden="true">/</span>
        <span>{s.ticker.tools}</span>
        <a href="#du-an">{s.ticker.explore} <Icon name="arrow" size={15}/></a>
      </div>

      <section className="section container section-fields" id="linh-vuc" aria-labelledby="fields-heading">
        <div className="section-header" data-reveal>
          <div><p className="section-eyebrow"><span>01 /</span> {s.sections.fields.eyebrow}</p><h2 id="fields-heading">{s.sections.fields.first}<br/><span>{s.sections.fields.accent}</span></h2></div>
          <p>{s.sections.fields.description}</p>
        </div>
        <div className="field-grid">
          {categories.map((category, index) => {
            const copy = localizedCategory(locale, category);
            return <a href={categoryHref(locale, category.slug)} className="field-card" key={category.slug} data-reveal>
              <div className="field-art">
                <Artwork src={category.image} alt={copy.imageAlt} sizes="(max-width: 740px) 90vw, (max-width: 1100px) 44vw, 375px"/>
                <span className="field-number">/ 0{index + 1}</span>
              </div>
              <div className="field-info"><div><span className="field-eyebrow">{copy.eyebrow}</span><h3>{copy.name}</h3><p>{copy.description}</p></div><span className="field-action" aria-hidden="true"><Icon name="arrow" size={21}/></span></div>
            </a>;
          })}
        </div>
      </section>

      <section className="section section-projects" id="du-an" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-header" data-reveal><div><p className="section-eyebrow"><span>02 /</span> {s.sections.projects.eyebrow}</p><h2 id="projects-heading">{s.sections.projects.first}<br/><span>{s.sections.projects.accent}</span></h2></div><p>{s.sections.projects.description}</p></div>
          <div className="product-grid">{featured.map((product, index) => <ProductCard key={product.slug} product={product} locale={locale} index={index}/>)}</div>
          <div className="projects-footnote"><span className="notice-icon"><Icon name="clock" size={18}/></span><span>{s.projectNotice}</span></div>
        </div>
      </section>

      <section className="section container philosophy-section" aria-labelledby="philosophy-heading">
        <div className="section-header" data-reveal><div><p className="section-eyebrow"><span>03 /</span> {s.sections.philosophy.eyebrow}</p><h2 id="philosophy-heading">{s.sections.philosophy.first}<br/><span>{s.sections.philosophy.accent}</span></h2></div><p>{s.sections.philosophy.description}</p></div>
        <div className="approach-grid">{s.approaches.map((item, index) => <div className="approach-card" key={item.title} data-reveal><span className="approach-no">{String(index + 1).padStart(2, '0')} / 03</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      </section>

      <section className="section about-section" id="gioi-thieu" aria-labelledby="about-heading">
        <div className="container about-grid">
          <div className="about-intro" data-reveal>
            <p className="section-eyebrow"><span>04 /</span> {s.sections.about.eyebrow}</p>
            <h2 id="about-heading">{s.sections.about.first}<br/><span>{s.sections.about.accent}</span></h2>
            <p>{s.sections.about.description}</p>
            <div className="about-location"><Icon name="pin" size={17}/> {s.sections.about.location}</div>
          </div>
          <div className="about-identity" data-reveal>
            <span className="about-identity-overline">{s.sections.about.eyebrow}</span>
            <h3 className="about-company-name" lang={locale}>{s.company.displayName}</h3>
            <span className="about-identity-rule" aria-hidden="true" />
            <p className="about-brand-name">VPN Digital</p>
          </div>
        </div>
      </section>

      <section className="container contact-section" id="lien-he" aria-labelledby="contact-heading">
        <div className="contact-panel" data-reveal>
          <div className="contact-copy"><p className="section-eyebrow"><span>05 /</span> {s.sections.contact.eyebrow}</p><h2 id="contact-heading">{s.sections.contact.first}<br/><span>{s.sections.contact.accent}</span></h2><p>{s.sections.contact.description}</p>
            <a className="button button-contact" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(company.locality + ', Việt Nam')} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18}/> {s.common.map} <Icon name="external" size={16}/><span className="sr-only"> {s.common.newTab}</span></a>
          </div>
          <div className="contact-side"><ContactForm/>
            <div className="contact-aside"><span className="contact-aside-label">{s.sections.contact.locationLabel}</span><strong>{company.locality}</strong><p>{company.locality}</p>
              {company.email && <a href={'mailto:' + company.email} className="contact-method"><Icon name="mail" size={18}/>{company.email}</a>}
              {company.phone && <a href={'tel:' + company.phone.replace(/[^+\d]/g, '')} className="contact-method"><Icon name="phone" size={18}/>{company.phone}</a>}
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...organization, name: s.company.displayName }).replace(/</g, '\\u003c') }} />
  </div>;
}
