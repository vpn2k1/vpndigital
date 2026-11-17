export function Artwork({ src, alt, priority = false, className = '', sizes = '(max-width: 760px) calc(100vw - 48px), 50vw' }: { src: string; alt: string; priority?: boolean; className?: string; sizes?: string }) {
  const small = src.replace('.webp', '-640.webp');
  return <img className={className} src={src} srcSet={`${small} 640w, ${src} 1600w`} sizes={sizes} alt={alt} width={1600} height={1067} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
