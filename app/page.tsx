import { Header } from '@/components/Header';
import { BrandLockup } from '@/components/BrandLockup';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { categories } from '@/content/catalog';
import { Icon } from '@/components/Icon';
import { company } from '@/content/company';
import { siteUrl } from '@/lib/seo';

const organization = {
  '@context': 'https://schema.org', '@type': 'Organization', name: company.name,
  legalName: company.legalName, alternateName: company.shortName, taxID: company.taxId,
  ...(siteUrl ? { url: siteUrl.href } : {}),
  address: { '@type': 'PostalAddress', streetAddress: 'thôn Phú Nhạn, Xã Mễ Sở', addressRegion: 'Hưng Yên', addressCountry: 'VN' },
};
const approaches = [
  { no: '01', title: 'Từ ý tưởng', text: 'Mỗi trải nghiệm bắt đầu từ một câu hỏi, một nhu cầu hoặc một cách nhìn mới.' },
  { no: '02', title: 'Đến trải nghiệm', text: 'Ưu tiên sự rõ ràng, cảm xúc và tính hữu ích trong từng tương tác.' },
  { no: '03', title: 'Và không ngừng hoàn thiện', text: 'Thử nghiệm, học hỏi và phát triển sản phẩm theo từng bước.' },
];

export default function Home() {
  const featured = products.filter(product => product.featured).slice(0, 3);
  return <div id="top" className="site-shell">
    <a href="#noi-dung" className="skip-link">Đến nội dung chính</a>
    <Header />
    <main id="noi-dung">
      <section className="container home-hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line"/> DIGITAL PRODUCT STUDIO <span className="eyebrow-muted">/ VIỆT NAM</span></p>
          <span className="hero-status"><span className="status-dot" aria-hidden="true"/> Những điều mới đang được tạo nên</span>
          <h1 id="hero-heading">Ý tưởng mới.<br/><span>Trải nghiệm</span><br/>khác biệt<span className="accent-period">.</span></h1>
          <p className="hero-description">Tại VPN Digital, chúng tôi hướng tới những trải nghiệm số chỉn chu trong ứng dụng, phần mềm và công cụ dành cho người sáng tạo.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#du-an">Khám phá dự án <Icon name="arrow" size={19}/></a>
            <a className="button button-quiet" href="#gioi-thieu">Về chúng tôi <Icon name="down" size={17}/></a>
          </div>
          <div className="hero-meta"><span><strong>03</strong> Lĩnh vực</span><span className="meta-divider"/><span><strong>06</strong> Ý tưởng</span><span className="meta-divider"/><span><strong>∞</strong> Khả năng</span></div>
        </div>
        <div className="brand-stage brand-stage-home" data-reveal>
          <span className="brand-stage-orbit" aria-hidden="true"/>
          <BrandLockup variant="stage" />
          <span className="brand-stage-index" aria-hidden="true">VPN / DIGITAL</span>
        </div>
      </section>

      <div className="container ticker-wrap" aria-label="Trạng thái dự án">
        <span className="ticker-lead"><span className="status-dot" aria-hidden="true"/> ĐANG PHÁT TRIỂN</span>
        <span>Ứng dụng số</span><span className="ticker-separator">✳</span>
        <span>Phần mềm</span><span className="ticker-separator">✳</span>
        <span>Công cụ sáng tạo</span>
        <a href="#du-an">Khám phá <Icon name="arrow" size={15}/></a>
      </div>

      <section className="section container section-fields" id="linh-vuc" aria-labelledby="fields-heading">
        <div className="section-header" data-reveal>
          <div><p className="section-eyebrow"><span>01 /</span> HỆ SINH THÁI</p><h2 id="fields-heading">Ba hướng đi.<br/><span>Một tinh thần sáng tạo.</span></h2></div>
          <p>Ứng dụng, phần mềm và công cụ — ba mảnh ghép chúng tôi đang phát triển, cùng hướng đến những trải nghiệm hữu ích và khác biệt.</p>
        </div>
        <div className="field-grid">
          {categories.map((category, index) => <a href={'/' + category.slug + '/'} className="field-card" key={category.slug} data-reveal>
            <div className="field-art field-art-type" aria-hidden="true">
              <span className="field-large-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="field-grid-marker">VPN / {category.slug.toUpperCase()}</span>
            </div>
            <div className="field-info"><div><span className="field-eyebrow">{category.eyebrow}</span><h3>{category.name}</h3><p>{category.description}</p></div><span className="field-action" aria-hidden="true"><Icon name="arrow" size={21}/></span></div>
          </a>)}
        </div>
      </section>

      <section className="section section-projects" id="du-an" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-header" data-reveal><div><p className="section-eyebrow"><span>02 /</span> ĐANG KIẾN TẠO</p><h2 id="projects-heading">Những ý tưởng<br/><span>đang thành hình.</span></h2></div><p>Từ một trò chơi nhỏ đến công cụ làm việc. Đây là những concept đang trong giai đoạn phát triển, chưa có chức năng sử dụng hoặc tải về.</p></div>
          <div className="product-grid">{featured.map((product, index) => <ProductCard key={product.slug} product={product} index={index}/>)}</div>
          <div className="projects-footnote"><span className="notice-icon"><Icon name="clock" size={18}/></span><span>Tất cả sản phẩm trên website hiện ở trạng thái <strong>Sắp ra mắt</strong>. Thời điểm phát hành chưa được công bố.</span></div>
        </div>
      </section>

      <section className="section container philosophy-section" aria-labelledby="philosophy-heading">
        <div className="section-header" data-reveal><div><p className="section-eyebrow"><span>03 /</span> CÁCH CHÚNG TÔI NGHĨ</p><h2 id="philosophy-heading">Công nghệ tốt.<br/><span>Bắt đầu từ con người.</span></h2></div><p>Không chạy theo những điều phức tạp. Chúng tôi ưu tiên trải nghiệm dễ hiểu, có mục đích và có không gian để phát triển lâu dài.</p></div>
        <div className="approach-grid">{approaches.map(item => <div className="approach-card" key={item.no} data-reveal><span className="approach-no">{item.no} / 03</span><span className="approach-symbol" aria-hidden="true"><Icon name="sparkle" size={23}/></span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      </section>

      <section className="section about-section" id="gioi-thieu" aria-labelledby="about-heading">
        <div className="container about-grid">
          <div className="about-intro" data-reveal><p className="section-eyebrow"><span>04 /</span> VỀ CHÚNG TÔI</p><h2 id="about-heading">Từ Phương Nam.<br/><span>Vươn đến thế giới số.</span></h2><p>VPN Digital là tên viết tắt của Công nghệ số Phương Nam, doanh nghiệp tại Hưng Yên, Việt Nam, định hướng phát triển trò chơi điện tử, phần mềm và công cụ liên quan.</p><div className="about-location"><Icon name="pin" size={17}/> HƯNG YÊN · VIỆT NAM</div></div>
          <div className="company-panel" data-reveal>
            <div className="company-panel-top"><span>HỒ SƠ DOANH NGHIỆP</span><span className="panel-spark">✳</span></div>
            <h3>{company.legalName}</h3>
            <dl className="company-facts">
              <div><dt>Tên quốc tế</dt><dd>{company.internationalName}</dd></div>
              <div><dt>Tên viết tắt</dt><dd>{company.shortName}</dd></div>
              <div><dt>Mã số thuế</dt><dd>{company.taxId}</dd></div>
              <div><dt>Người đại diện</dt><dd>{company.representative}</dd></div>
              <div><dt>Địa chỉ</dt><dd>{company.address}</dd></div>
              <div><dt>Ngành nghề chính</dt><dd>{company.mainIndustry}</dd></div>
            </dl><p className="company-note">Thông tin doanh nghiệp do công ty cung cấp.</p>
          </div>
        </div>
      </section>

      <section className="container contact-section" id="lien-he" aria-labelledby="contact-heading">
        <div className="contact-panel" data-reveal>
          <div className="contact-copy"><p className="section-eyebrow"><span>05 /</span> KẾT NỐI</p><h2 id="contact-heading">Một cuộc trò chuyện.<br/><span>Nhiều khả năng mới.</span></h2><p>Quan tâm đến lĩnh vực chúng tôi đang xây dựng? Hãy bắt đầu bằng một kết nối.</p>
            <a className="button button-contact" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(company.address)} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18}/> Xem vị trí trên bản đồ <Icon name="external" size={16}/><span className="sr-only"> (mở tab mới)</span></a>
          </div>
          <div className="contact-aside"><span className="contact-aside-label">CHÚNG TÔI Ở ĐÂY</span><strong>{company.locality}</strong><p>{company.address}</p>
            {company.email && <a href={'mailto:' + company.email} className="contact-method"><Icon name="mail" size={18}/>{company.email}</a>}
            {company.phone && <a href={'tel:' + company.phone.replace(/[^+\d]/g, '')} className="contact-method"><Icon name="phone" size={18}/>{company.phone}</a>}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
  </div>;
}
