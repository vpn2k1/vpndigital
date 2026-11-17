import type { CSSProperties } from 'react';
export function Icon({ name, size = 24, style }: { name: string; size?: number; style?: CSSProperties }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    up: <><path d="M12 20V4M5 11l7-7 7 7" /></>,
    external: <><path d="M14 4h6v6M20 4 9 15M10 4H4v16h16v-6" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    game: <><path d="M8 6h8c3 0 4 3 5 7l1 5c0 2-2 3-4 1l-3-3H9l-3 3c-2 2-4 1-4-1l1-5c1-4 2-7 5-7Z" /><path d="M6 10v4M4 12h4M16 10h.1M19 13h.1" /></>,
    code: <><rect x="2" y="3" width="20" height="14" rx="1" /><path d="M8 7l-3 3 3 3M16 7l3 3-3 3M13 7l-2 6M8 21h8M12 17v4" /></>,
    layers: <><path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="1" /><path d="m2 5 10 8L22 5" /></>,
    phone: <><path d="m7 2 3 5-3 3c2 3 4 5 7 7l3-3 5 3-2 4C10 23 1 14 2 4l5-2Z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name] || paths.arrow}</svg>;
}
