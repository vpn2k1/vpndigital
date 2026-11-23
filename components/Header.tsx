'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { categoryHref, homeHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { useLanguage } from '@/hooks/useLanguage';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLockup } from './BrandLockup';
import { Icon } from './Icon';

export function Header() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const s = getStrings(locale);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const media = window.matchMedia('(min-width: 961px)');
    const closeAtDesktop = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', onEscape);
    media.addEventListener('change', closeAtDesktop);
    return () => {
      document.removeEventListener('keydown', onEscape);
      media.removeEventListener('change', closeAtDesktop);
    };
  }, []);
  const navigation = [
    { href: homeHref(locale) + '#gioi-thieu', label: s.nav.about },
    { href: categoryHref(locale, 'ung-dung'), label: s.nav.apps },
    { href: categoryHref(locale, 'phan-mem'), label: s.nav.software },
    { href: categoryHref(locale, 'cong-cu'), label: s.nav.tools },
    { href: homeHref(locale) + '#lien-he', label: s.nav.contact },
  ];
  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href={homeHref(locale)} aria-label={'VPN Digital — ' + s.nav.home} onClick={() => setOpen(false)}>
        <BrandLockup variant="header" locale={locale} />
      </a>
      <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label={s.nav.mainNavigation}>
        {navigation.map(item => {
          const active = !item.href.includes('#') && pathname.replace(/\/$/, '') === item.href.replace(/\/$/, '');
          return <a key={item.href} href={item.href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</a>;
        })}
        <a className="mobile-nav-contact" href={homeHref(locale) + '#lien-he'} onClick={() => setOpen(false)}>{s.nav.mobileConnect} <Icon name="arrow" size={18}/></a>
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        <a className="header-cta" href={homeHref(locale) + '#lien-he'}>{s.nav.connect} <Icon name="external" size={16} /></a>
        <button className="menu-toggle" ref={toggleRef} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? s.nav.menuClose : s.nav.menuOpen} onClick={() => setOpen(value => !value)}>
          <span/><span/>
        </button>
      </div>
    </div>
  </header>;
}
