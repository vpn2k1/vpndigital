import { company } from '@/content/company';
import { categories } from '@/content/catalog';
import { Icon } from './Icon';

export function Footer() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-intro">
        <a className="footer-brand" href="/" aria-label="VPN Digital — Trang chủ"><span className="footer-brand-wordmark" aria-hidden="true" /></a>
        <p>Công nghệ Việt. Khát vọng số.</p>
        <span className="footer-status"><span className="status-dot" aria-hidden="true"/> Đang kiến tạo những trải nghiệm mới</span>
      </div>
      <nav className="footer-links" aria-label="Khám phá website">
        <p className="footer-heading">KHÁM PHÁ</p>
        <a href="/#gioi-thieu">Về VPN Digital</a>
        {categories.map(category => <a href={'/' + category.slug + '/'} key={category.slug}>{category.name}</a>)}
      </nav>
      <div className="footer-contact">
        <p className="footer-heading">KẾT NỐI</p>
        <p>{company.locality}, Việt Nam</p>
        <a href="/#lien-he">Thông tin liên hệ <Icon name="external" size={15}/></a>
        <a href="#top" className="footer-top-link">Về đầu trang <Icon name="up" size={16}/></a>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} VPN Digital. Một dự án của Công nghệ số Phương Nam.</span>
      <span>Mã số thuế: {company.taxId}</span>
    </div>
  </footer>;
}
