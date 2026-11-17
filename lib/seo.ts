export function resolveSiteUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return undefined;
    return new URL(url.origin);
  } catch { return undefined; }
}
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const indexable = !!siteUrl && process.env.SITE_INDEXABLE === 'true' && process.env.VERCEL_ENV !== 'preview';
