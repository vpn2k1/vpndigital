import type { MetadataRoute } from 'next';
import { siteUrl, indexable } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...(indexable ? { allow: '/' } : { disallow: '/' }) },
      // Use an array so Next.js emits the empty Disallow directive.
      { userAgent: 'Google-adstxt', disallow: [''] },
    ],
    ...(indexable && siteUrl ? { sitemap: new URL('/sitemap.xml', siteUrl).href } : {}),
  };
}
