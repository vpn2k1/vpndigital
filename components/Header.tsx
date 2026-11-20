'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { company, navigation } from '@/content/company';
import { ThemeToggle } from './ThemeToggle';
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); }
    };
    const media = window.matchMedia('(min-width: 761px)');
    const reset = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    media.addEventListener('change', reset);
    return () => { document.removeEventListener('keydown', closeOnEscape); media.removeEventListener('change', reset); };
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href="/" aria-label="VPN Digital — về trang chủ" onClick={() => setOpen(false)}>
        <span className="brand-wordmark" aria-hidden="true" />
      </a>
      <button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Đóng menu' : 'Mở menu'} onClick={() => setOpen(!open)}><span /> <span /></button>
      <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Điều hướng chính">
        {navigation.map(item => <a key={item.href} href={item.href} aria-current={pathname === item.href.replace(/\/$/, '') || pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
        <ThemeToggle />
      </nav>
    </div>
  </header>;
}
