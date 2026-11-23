'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/content/company';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';

export function Header() {
  const pathname = usePathname();
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

  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href="/" aria-label="VPN Digital — Trang chủ" onClick={() => setOpen(false)}>
        <span className="brand-wordmark" aria-hidden="true" />
      </a>
      <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Điều hướng chính">
        {navigation.map(item => {
          const active = !item.href.includes('#') && pathname.replace(/\/$/, '') === item.href.replace(/\/$/, '');
          return <a key={item.href} href={item.href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</a>;
        })}
        <a className="mobile-nav-contact" href="/#lien-he" onClick={() => setOpen(false)}>Kết nối với chúng tôi <Icon name="arrow" size={18}/></a>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <a className="header-cta" href="/#lien-he">Kết nối <Icon name="external" size={16} /></a>
        <button className="menu-toggle" ref={toggleRef} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Đóng menu' : 'Mở menu'} onClick={() => setOpen(value => !value)}>
          <span/><span/>
        </button>
      </div>
    </div>
  </header>;
}
