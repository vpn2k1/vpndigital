import type { Metadata } from 'next';
import { siteUrl, indexable } from '@/lib/seo';
import { MotionReveal } from '@/components/MotionReveal';
import './studio.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
const title = 'VPN Digital | Ứng dụng · Phần mềm · Công cụ';
const description = 'PhuongNam Digital — Công ty TNHH Một Thành Viên Công Nghệ Số Phương Nam. Phát triển ứng dụng, phần mềm và công cụ số.';
export const metadata: Metadata = {
  title, description,
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: '/' } } : {}),
  robots: { index: indexable, follow: indexable },
  openGraph: { title, description, locale: 'vi_VN', type: 'website', siteName: 'PhuongNam Digital', ...(siteUrl ? { url: siteUrl.href, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PhuongNam Digital — Công nghệ Việt. Khát vọng số.' }] } : {}) },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/vpn-digital/favicon-32.png', sizes: '32x32', type: 'image/png' }], apple: '/apple-touch-icon.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><head><script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('phuongnam-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} /></head><body><MotionReveal />{children}</body></html>;
}
