import type { Metadata } from 'next';
import { siteUrl, indexable } from '@/lib/seo';
import { MotionReveal } from '@/components/MotionReveal';
import { LanguageDocument } from '@/components/LanguageDocument';
import './studio.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';

const title = 'VPN Digital | Apps · Software · Tools';
const description = 'VPN Digital — exploring digital applications, software and tools, by Phuong Nam Digital Technology in Vietnam.';
export const metadata: Metadata = {
  title, description,
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  robots: { index: indexable, follow: indexable },
  openGraph: { title, description, locale: 'en_US', type: 'website', siteName: 'VPN Digital',
    ...(siteUrl ? { url: siteUrl.href, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VPN Digital — Digital experiences' }] } : {}) },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/vpn-digital/favicon-32.png', sizes: '32x32', type: 'image/png' }], apple: '/apple-touch-icon.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('phuongnam-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} /></head>
    <body><LanguageDocument/><MotionReveal />{children}</body>
  </html>;
}
