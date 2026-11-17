'use client';

import { useEffect, useState } from 'react';

const storageKey = 'phuongnam-theme';

function activeTheme(): 'light' | 'dark' {
  const selected = document.documentElement.dataset.theme;
  if (selected === 'light' || selected === 'dark') return selected;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateFavicon() {
  const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (icon) icon.href = `/brand/theme/vpn-logo-${activeTheme()}.png`;
}

export function ThemeToggle() {
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

  const label = theme === 'dark' ? 'Chuyển sang giao diện sáng' : theme === 'light' ? 'Chuyển sang giao diện tối' : 'Đổi giao diện sáng hoặc tối';
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} aria-pressed={theme === 'dark'} title={label}>
    <svg className="theme-icon-moon" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.2 16.1A8.5 8.5 0 0 1 7.9 3.8a8.5 8.5 0 1 0 12.3 12.3Z" /></svg>
    <svg className="theme-icon-sun" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    <span>Giao diện</span>
  </button>;
}
