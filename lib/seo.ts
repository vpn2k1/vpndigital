export function resolveSiteUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return undefined;
    return new URL(url.origin);
  } catch { return undefined; }
}
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
// CF_PAGES_BRANCH is set by Cloudflare Pages builds: only the main branch may be indexed, never branch previews.
const previewBuild = process.env.VERCEL_ENV === 'preview' || (!!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main');
export const indexable = !!siteUrl && process.env.SITE_INDEXABLE === 'true' && !previewBuild;
