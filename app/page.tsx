import { Header } from '@/components/Header';
import { Artwork } from '@/components/Artwork';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { categories } from '@/content/catalog';
import { Icon } from '@/components/Icon';
import { company, sitePresentation } from '@/content/company';
import { siteUrl } from '@/lib/seo';
const organization = {
  '@context': 'https://schema.org', '@type': 'Organization', name: company.name,
  legalName: company.legalName, alternateName: company.shortName, taxID: company.taxId,
  ...(siteUrl ? { url: siteUrl.href } : {}),
  address: { '@type': 'PostalAddress', streetAddress: 'thôn Phú Nhạn, Xã Mễ Sở', addressRegion: 'Hưng Yên', addressCountry: 'VN' },
};
export default function Home() {
  return <div id="top">
    <a href="#noi-dung" className="skip-link">Đến nội dung chính</a>
    <Header />
    <main id="noi-dung">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span /> CÔNG NGHỆ SỐ PHƯƠNG NAM</p>
          <h1 id="hero-heading">Công nghệ Việt.<br /><span>Khát vọng số.</span></h1>
          <p className="hero-description">Phát triển trò chơi điện tử, phần mềm<br className="desktop-break" /> và công cụ phần mềm trò chơi điện tử.</p>
          <a className="button" href="#gioi-thieu">Tìm hiểu về chúng tôi <Icon name="arrow" size={21} /></a>
          <div className="hero-note"><span className="small-star" aria-hidden="true">✦</span><span>Từ Hưng Yên, Việt Nam</span><span className="note-line" /></div>
        </div>
        <div className="hero-art hero-art-illustrated" data-reveal><Artwork src="/images/hero.webp" alt="Minh họa 2.5D đảo nổi với cổng đỏ ruby, khối ngà và tay cầm game" priority/><span className="art-caption">BẢN SẮC VIỆT · TINH THẦN SỐ</span></div>
      </section>
      {sitePresentation.showBrandShowcase && <section className="brand-banner-section container" aria-label="Nhận diện thương hiệu VPN Digital" data-reveal>
        <span className="eyebrow">NHẬN DIỆN PHƯƠNG NAM</span>
        <div className="brand-theme-banner" role="img" aria-label="Banner VPN Digital với hoa sen và quỹ đạo sao" />
      </section>}
      <section id="gioi-thieu" className="company-profile container" data-reveal aria-labelledby="about-heading">
        <div className="profile-intro">
          <p className="eyebrow">VỀ DOANH NGHIỆP</p>
          <h2 id="about-heading">PhuongNam<br />Digital<span className="period">.</span></h2>
          <p className="profile-lead">Từ Mễ Sở, Hưng Yên, PhuongNam Digital tập trung vào lĩnh vực trò chơi điện tử: phát triển game, phần mềm trò chơi và các công cụ phần mềm liên quan.</p>
          <div className="profile-location"><span aria-hidden="true" /> HƯNG YÊN · VIỆT NAM</div>
        </div>
        <div className="profile-card">
          <div className="profile-card-top"><span>HỒ SƠ DOANH NGHIỆP</span><span>PHƯƠNG NAM / VIỆT NAM</span></div>
          <h3>{company.legalName}</h3>
          <p className="profile-note">Thông tin doanh nghiệp do công ty cung cấp.</p>
          <dl className="profile-facts">
            <div><dt>Tên quốc tế</dt><dd>{company.internationalName}</dd></div>
            <div><dt>Tên viết tắt</dt><dd>{company.shortName}</dd></div>
            <div><dt>Mã số thuế</dt><dd>{company.taxId}</dd></div>
            <div><dt>Người đại diện</dt><dd>{company.representative}</dd></div>
            <div className="profile-fact-wide"><dt>Địa chỉ doanh nghiệp</dt><dd>{company.address}</dd></div>
          </dl>
          <div className="profile-industry"><span>NGÀNH NGHỀ CHÍNH</span><p>{company.mainIndustry}</p></div>
        </div>
      </section>
      <section id="linh-vuc" className="fields container" aria-labelledby="fields-heading">
        <div className="section-kicker"><span className="eyebrow" id="fields-heading">BA MẢNG HOẠT ĐỘNG</span><span className="kicker-rule" /></div>
        <p className="fields-intro">Khám phá các nhóm nội dung về game, phần mềm và công cụ phát triển. Các sản phẩm trong danh mục hiện là ví dụ minh họa.</p>
        <div className="category-cards">{categories.map(category => <a className="category-card" data-reveal key={category.slug} href={`/${category.slug}/`}><Artwork src={category.image} alt={category.imageAlt} sizes="(max-width: 760px) calc(100vw - 48px), 370px"/><div><h2>{category.name}</h2><p>{category.description}</p><span className="product-read">Khám phá <Icon name="arrow" size={18}/></span></div></a>)}</div>
      </section>
      <section className="featured container"><div className="section-heading-row" data-reveal><div><p className="eyebrow">KHÁM PHÁ SẢN PHẨM</p><h2>Một vài ý tưởng để bắt đầu.</h2></div></div><p className="demo-notice"><span className="demo-badge">DEMO</span> Các mục có nhãn DEMO là nội dung minh họa, chưa phải sản phẩm đã phát hành.</p><div className="product-grid">{products.filter(product => product.featured).slice(0, 3).map(product => <ProductCard key={product.slug} product={product}/>)}</div></section>
      <section id="lien-he" className="contact" data-reveal aria-labelledby="contact-heading"><div className="container contact-inner">
        <div><p className="eyebrow">KẾT NỐI VỚI PHƯƠNG NAM</p><h2 id="contact-heading">Bắt đầu từ<br />một kết nối.</h2></div>
        <div className="contact-info"><span className="contact-label">ĐỊA CHỈ DOANH NGHIỆP</span><p>{company.address}</p>
          <a className="text-link" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(company.address)} target="_blank" rel="noopener noreferrer">Xem vị trí trên bản đồ <Icon name="external" size={17} /><span className="sr-only"> (mở tab mới)</span></a>
          {company.email && <a className="contact-channel" href={'mailto:' + company.email}><Icon name="mail" size={20} />{company.email}</a>}
          {company.phone && <a className="contact-channel" href={'tel:' + company.phone.replace(/[^+\d]/g, '')}><Icon name="phone" size={20} />{company.phone}</a>}
        </div>
      </div></section>
    </main>
    <Footer/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
  </div>;
}
