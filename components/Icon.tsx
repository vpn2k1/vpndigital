import type { CSSProperties } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUp, Clock3, Code2, ExternalLink,
  Gamepad2, Layers, Mail, MapPin, Menu, Phone, Sparkles,
  type LucideIcon
} from 'lucide-react';

// Built-in, accessible SVG icons: crisp at every size, consistent in dark/light themes.
const icons: Record<string, LucideIcon> = {
  arrow: ArrowRight,
  up: ArrowUp,
  down: ArrowDown,
  external: ExternalLink,
  pin: MapPin,
  game: Gamepad2,
  code: Code2,
  layers: Layers,
  mail: Mail,
  phone: Phone,
  clock: Clock3,
  sparkle: Sparkles,
  menu: Menu
};

export function Icon({ name, size = 24, style }: { name: string; size?: number; style?: CSSProperties }) {
  const Glyph = icons[name] ?? ArrowRight;
  // Icons complement text labels; decorative glyphs are hidden from screen readers.
  return <Glyph size={size} strokeWidth={1.85} className="ui-lucide-icon" aria-hidden="true" focusable="false" style={style} />;
}
