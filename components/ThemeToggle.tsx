'use client';

import { useEffect, useState } from 'react';
import { getStrings } from '@/config/strings';
import { useLanguage } from '@/hooks/useLanguage';

const storageKey = 'phuongnam-theme';

function activeTheme(): 'light' | 'dark' {
  const selected = document.documentElement.dataset.theme;
  if (selected === 'light' || selected === 'dark') return selected;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateFavicon() {
  const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (icon) icon.href = activeTheme() === 'dark' ? '/brand/vpn-digital/mark-dark.svg' : '/favicon.svg';
}

export function ThemeToggle() {
  const { locale } = useLanguage();
  const copy = getStrings(locale).theme;
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  useEffect(() => {
    const sync = () => { setTheme(activeTheme()); updateFavicon(); };
    sync();
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  function toggleTheme() {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem(storageKey, next); } catch { /* Storage may be unavailable. */ }
    setTheme(next);
    updateFavicon();
  }

  const label = theme === 'dark' ? copy.switchLight : theme === 'light' ? copy.switchDark : copy.toggle;

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} aria-pressed={theme === 'dark'} title={label}>
    <svg className="theme-icon-moon" viewBox="0 0 24 24" width="23" height="23" fill="currentColor" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M20.3 15.7A8.5 8.5 0 0 1 8.3 3.7a8.5 8.5 0 1 0 12 12Z" />
    </svg>
    <svg className="theme-icon-sun" viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 1.9v2.2m0 15.8v2.2M4.85 4.85l1.56 1.56m11.18 11.18 1.56 1.56M1.9 12h2.2m15.8 0h2.2M4.85 19.15l1.56-1.56M17.59 6.41l1.56-1.56" />
    </svg>
    <span className="sr-only">{copy.toggle}</span>
  </button>;
}
