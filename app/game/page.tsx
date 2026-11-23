import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Ứng dụng — VPN Digital',
  description: 'Danh mục Game trước đây hiện thuộc Ứng dụng số của VPN Digital.',
  robots: { index: false, follow: true },
  ...(siteUrl ? { alternates: { canonical: '/ung-dung/' } } : {}),
};
export default function LegacyGamePage() {
 return <div className="site-shell" id="top"><Header/><main className="container legacy-category" id="noi-dung"><p className="section-eyebrow">DANH MỤC ĐÃ CẬP NHẬT</p><h1>Game nay thuộc <span>Ứng dụng.</span></h1><p>Chúng tôi đã sắp xếp lại ba lĩnh vực chính thành Ứng dụng, Phần mềm và Công cụ. Các ý tưởng game vẫn nằm trong lĩnh vực Ứng dụng.</p><a href="/ung-dung/" className="button button-primary">Khám phá Ứng dụng <Icon name="arrow" size={19}/></a></main><Footer/></div>;
}
