import type { Locale } from '@/config/i18n';
import { getStrings } from '@/config/strings';

/** Brand icon remains a real image; name and translated tagline are HTML text. */
export function BrandLockup({ variant = 'header', locale = 'en' }: { variant?: 'header' | 'footer' | 'stage' | 'overlay'; locale?: Locale }) {
  return <span className={'brand-lockup brand-lockup-' + variant}>
    <span className="brand-lockup-icon" aria-hidden="true">
      <img className="brand-icon-light" src="/brand/vpn-digital/mark.svg" alt="" width={260} height={214} decoding="async" />
      <img className="brand-icon-dark" src="/brand/vpn-digital/mark-dark.svg" alt="" width={260} height={214} decoding="async" />
    </span>
    <span className="brand-lockup-copy">
      <span className="brand-lockup-name">VPN <span>Digital</span></span>
      <span className="brand-lockup-tagline">{getStrings(locale).brand.tagline}</span>
    </span>
  </span>;
}
