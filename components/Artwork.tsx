export function Artwork({ src, alt, priority = false, className = '', sizes = '(max-width: 760px) 90vw, 50vw' }: { src: string; alt: string; priority?: boolean; className?: string; sizes?: string }) {
  const small = src.replace('.webp', '-640.webp');
  const light = src.replace('.webp', '-light.webp');
  const lightSmall = src.replace('.webp', '-light-640.webp');
  const loading = priority ? 'eager' as const : 'lazy' as const;
  return <span className={'theme-artwork ' + className}>
    {/* Visual A/B test: invert which original WebP family is displayed by theme. No binaries overwritten. */}
    <img className="theme-artwork-dark" src={light} srcSet={lightSmall + ' 640w, ' + light + ' 1600w'} sizes={sizes} alt={alt} width={1600} height={1067} loading={loading} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    <img className="theme-artwork-light" src={src} srcSet={small + ' 640w, ' + src + ' 1600w'} sizes={sizes} alt={alt} width={1600} height={1067} loading={loading} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
  </span>;
}
