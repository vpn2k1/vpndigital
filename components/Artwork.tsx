/**
 * One original WebP image is shown in every theme.
 * The unsuffixed file is the artwork previously visible in Light Mode.
 * srcSet supplies its responsive 640px counterpart without changing the artwork.
 */
export function Artwork({ src, alt, priority = false, className = '', sizes = '(max-width: 760px) 90vw, 50vw' }: { src: string; alt: string; priority?: boolean; className?: string; sizes?: string }) {
  const small = src.replace('.webp', '-640.webp');
  return <span className={('theme-artwork ' + className).trim()}>
    <img src={src} srcSet={small + ' 640w, ' + src + ' 1600w'} sizes={sizes} alt={alt}
      width={1600} height={1067} loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
  </span>;
}
