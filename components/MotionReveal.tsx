'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function MotionReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!items.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -24px 0px', threshold: 0.08 });

    // Enable reveal only after the observer is ready. Without JS, content remains visible.
    items.forEach(item => observer.observe(item));
    document.documentElement.classList.add('motion-ready');
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
      items.forEach(item => item.classList.remove('is-visible'));
    };
  }, [pathname]);
  return null;
}
