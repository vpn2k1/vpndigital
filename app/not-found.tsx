'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { useLanguage } from '@/hooks/useLanguage';
import { homeHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';

export default function NotFound() {
  const { locale } = useLanguage();
  const s = getStrings(locale);
  return <div className="site-shell" id="top" lang={locale}>
    <a className="skip-link" href="#noi-dung">{s.nav.home}</a><Header/>
    <main className="container not-found" id="noi-dung">
      <div className="not-found-num">404<span className="accent-period">.</span></div>
      <p className="section-eyebrow">{s.error.eyebrow}</p>
      <h1>{s.error.first}<br/>{s.error.second}</h1>
      <p>{s.error.description}</p>
      <a href={homeHref(locale)} className="button button-primary">{s.common.backHome} <Icon name="arrow" size={18}/></a>
    </main><Footer/>
  </div>;
}
