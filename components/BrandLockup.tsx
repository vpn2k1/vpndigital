/** Logo artwork stays an image; brand name and tagline remain genuine HTML text. */
export function BrandLockup({ variant = 'header' }: { variant?: 'header' | 'footer' | 'stage' | 'overlay' }) {
  return <span className={'brand-lockup brand-lockup-' + variant}>
    <span className="brand-lockup-icon" aria-hidden="true">
      <img className="brand-icon-light" src="/brand/vpn-digital/mark.svg" alt="" width={260} height={214} decoding="async" />
      <img className="brand-icon-dark" src="/brand/vpn-digital/mark-dark.svg" alt="" width={260} height={214} decoding="async" />
    </span>
    <span className="brand-lockup-copy">
      <span className="brand-lockup-name">VPN <span>Digital</span></span>
      <span className="brand-lockup-tagline">Ứng dụng · Phần mềm · Công cụ</span>
    </span>
  </span>;
}
