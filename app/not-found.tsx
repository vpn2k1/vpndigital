import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  return <div className="site-shell" id="top"><a className="skip-link" href="#noi-dung">Đến nội dung chính</a><Header/><main className="container not-found" id="noi-dung"><div className="not-found-num">404<span className="accent-period">.</span></div><p className="section-eyebrow">LẠC KHỎI QUỸ ĐẠO</p><h1>Trang bạn tìm<br/>không có ở đây.</h1><p>Đường dẫn có thể đã thay đổi. Hãy quay về VPN Digital để tiếp tục khám phá.</p><a href="/" className="button button-primary">Trở về trang chủ <Icon name="arrow" size={18}/></a></main><Footer/></div>;
}
