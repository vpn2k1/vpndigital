import type { Metadata } from 'next';
import { siteUrl, indexable } from '@/lib/seo';
import { MotionReveal } from '@/components/MotionReveal';
import './globals.css';
import './motion.css';
import './brand.css';
import './theme.css';
import './profile.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
const title = 'PhuongNam Digital | Công nghệ số Phương Nam';
const description = 'PhuongNam Digital — Công ty TNHH Một Thành Viên Công Nghệ Số Phương Nam. Phát triển trò chơi điện tử, phần mềm và công cụ phần mềm trò chơi điện tử.';
export const metadata: Metadata = {
  title, description,
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: '/' } } : {}),
  robots: { index: indexable, follow: indexable },
  openGraph: { title, description, locale: 'vi_VN', type: 'website', siteName: 'PhuongNam Digital', ...(siteUrl ? { url: siteUrl.href, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PhuongNam Digital — Công nghệ Việt. Khát vọng số.' }] } : {}) },
  icons: { icon: '/brand/theme/vpn-logo-light.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><head><script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('phuongnam-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} /></head><body><MotionReveal />{children}</body></html>;
}
