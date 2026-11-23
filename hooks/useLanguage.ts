'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { defaultLocale, languageFromPath, switchLocalePath, type Locale } from '@/config/i18n';

/** The URL, not localStorage, is the single source of truth for language. */
export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname() ?? '/' + defaultLocale + '/';
  const locale = languageFromPath(pathname);

  const changeLanguage = useCallback((next: Locale) => {
    if (next === locale) return;
    const target = switchLocalePath(pathname, next);
    const suffix = typeof window === 'undefined' ? '' : window.location.search + window.location.hash;
    router.push(target + suffix);
  }, [locale, pathname, router]);

  return { locale, changeLanguage, pathname };
}
