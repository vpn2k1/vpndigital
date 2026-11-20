export function Artwork({ src, alt, priority = false, className = '', sizes = '(max-width: 760px) calc(100vw - 48px), 50vw' }: { src: string; alt: string; priority?: boolean; className?: string; sizes?: string }) {
  const small = src.replace('.webp', '-640.webp');
  const light = src.replace('.webp', '-light.webp');
  const lightSmall = src.replace('.webp', '-light-640.webp');
  const props = { width: 1600, height: 1067, loading: priority ? 'eager' as const : 'lazy' as const, decoding: 'async' as const };
  return <span className={`theme-artwork ${className}`.trim()}>
    <img className="theme-artwork-dark" src={src} srcSet={`${small} 640w, ${src} 1600w`} sizes={sizes} alt={alt} fetchPriority={priority ? 'high' : 'auto'} {...props}/>
    <img className="theme-artwork-light" src={light} srcSet={`${lightSmall} 640w, ${light} 1600w`} sizes={sizes} alt="" aria-hidden="true" fetchPriority="low" {...props}/>
  </span>;
}
