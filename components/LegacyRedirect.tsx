'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { languageFromPath } from '@/config/i18n';
import { getStrings } from '@/config/strings';

/** Static-export-compatible navigation for pre-i18n links. */
export function LegacyRedirect({ to }: { to: string }) {
  const router = useRouter();
  const locale = languageFromPath(to);
  const s = getStrings(locale).legacy;
  useEffect(() => {
    const suffix = window.location.search + window.location.hash;
    router.replace(to + suffix);
  }, [router, to]);
  return <main className="container legacy-category" lang={locale}>
    <p className="section-eyebrow">VPN DIGITAL</p>
    <h1>{s.redirecting}</h1>
    <a className="button button-primary" href={to}>{s.continue}</a>
  </main>;
}
