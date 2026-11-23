'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Static-export-compatible navigation for pre-i18n links. */
export function LegacyRedirect({ to, label = 'Continue / Tiếp tục' }: { to: string; label?: string }) {
  const router = useRouter();
  useEffect(() => {
    const suffix = window.location.search + window.location.hash;
    router.replace(to + suffix);
  }, [router, to]);
  return <main className="container legacy-category">
    <p className="section-eyebrow">VPN DIGITAL</p>
    <h1>Redirecting…</h1>
    <a className="button button-primary" href={to}>{label}</a>
  </main>;
}
