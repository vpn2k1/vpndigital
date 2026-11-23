'use client';

import { company } from '@/content/company';
import { categories } from '@/content/catalog';
import { categoryHref, homeHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { useLanguage } from '@/hooks/useLanguage';
import { BrandLockup } from './BrandLockup';
import { Icon } from './Icon';

export function Footer() {
  const { locale } = useLanguage();
  const s = getStrings(locale);
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-intro">
        <a className="footer-brand" href={homeHref(locale)} aria-label={'VPN Digital — ' + s.nav.home}><BrandLockup variant="footer" locale={locale} /></a>
        <p>{s.footer.mission}</p>
        <span className="footer-status"><span className="status-dot" aria-hidden="true"/> {s.footer.status}</span>
      </div>
      <nav className="footer-links" aria-label={s.footer.explore}>
        <p className="footer-heading">{s.footer.explore}</p>
        <a href={homeHref(locale) + '#gioi-thieu'}>{s.footer.about}</a>
        {categories.map(category => <a href={categoryHref(locale, category.slug)} key={category.slug}>{s.categoryContent[category.slug].name}</a>)}
      </nav>
      <div className="footer-contact">
        <p className="footer-heading">{s.footer.connect}</p>
        <p>{s.footer.location}, {s.footer.vietnam}</p>
        <a href={homeHref(locale) + '#lien-he'}>{s.footer.contactInfo} <Icon name="external" size={15}/></a>
        <a href="#top" className="footer-top-link">{s.footer.top} <Icon name="up" size={16}/></a>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} VPN Digital. {s.company.attribution}</span>
    </div>
  </footer>;
}
