'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { languageFromPath } from '@/config/i18n';

export function LanguageDocument() {
  const pathname = usePathname();
  useEffect(() => { document.documentElement.lang = languageFromPath(pathname || '/'); }, [pathname]);
  return null;
}
