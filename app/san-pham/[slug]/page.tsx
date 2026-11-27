import { Icon } from '@/components/Icon';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts, getProduct, getProductsByCategory } from '@/lib/products';
import { getCategory } from '@/content/catalog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard, AppCover, statusLabel } from '@/components/ProductCard';
import { siteUrl } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return allProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.name} — ${p.subtitle} | PhuongNam Digital`;
  return { title, description: p.summary, ...(p.visible ? {} : { robots: { index: false } }), ...(siteUrl ? { alternates: { canonical: `/san-pham/${p.slug}/` } } : {}), openGraph: { title, description: p.summary, ...(siteUrl ? { url: `/san-pham/${p.slug}/`, images: [{ url: p.icon, width: 512, height: 512, alt: p.name }] } : {}) } };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const related = getProductsByCategory(product.category).filter(p => p.slug !== product.slug).slice(0, 3);
  return <div id="top"><a className="skip-link" href="#noi-dung">Đến nội dung chính</a><Header /><main id="noi-dung" className="container">
    <nav className="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><a href={`/${category.slug}/`}>{category.name}</a><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
    <section className="launch-detail" aria-labelledby="product-heading">
      <div className="launch-detail-copy" data-reveal>
        <p className="launch-kicker">VPN DIGITAL <span className="launch-divider">/</span> {category.name.toUpperCase()}</p>
        <span className="launch-pill"><span className="launch-dot" aria-hidden="true" /> {statusLabel(product)}</span>
        <h1 id="product-heading">{product.name}<span className="launch-period">.</span></h1>
        <p className="launch-detail-subtitle">{product.subtitle}</p>
        <p className="launch-description">{product.summary}</p>
        {!product.web && <div className="launch-notice"><strong>Sắp có trên cửa hàng ứng dụng</strong><span>Liên kết tải trên Google Play và App Store sẽ được cập nhật khi phát hành.</span></div>}
        <div className="launch-actions">{product.web ? <a className="button" href={product.web} target="_blank" rel="noopener noreferrer">Chơi ngay trên web <Icon name="external" size={17} /><span className="sr-only"> (mở tab mới)</span></a> : <a className="button" href={`/${category.slug}/`}>Khám phá {category.name} <Icon name="external" size={17} /></a>}<a className="launch-link" href="/#lien-he">Liên hệ <Icon name="external" size={17} /></a></div>
      </div>
      <div className="launch-detail-art" data-reveal>{product.splash ? <span className="app-cover" style={{ background: product.splashColor }}><img src={product.splash} alt={`Màn hình khởi động ${product.name}`} loading="eager" decoding="async" /></span> : <AppCover product={product} priority />}<span>{product.platform.toUpperCase()}</span></div>
    </section>
    <section className="launch-detail-info" data-reveal aria-label="Thông tin sản phẩm">
      <div><p className="eyebrow">GIỚI THIỆU</p><h2>{product.subtitle}</h2><p>{product.description}</p><h3>Tính năng chính</h3><ul className="feature-list">{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      <aside className="launch-facts"><p className="eyebrow">THÔNG TIN</p><dl><div><dt>Danh mục</dt><dd>{category.name}</dd></div><div><dt>Nền tảng</dt><dd>{product.platform}</dd></div><div><dt>Trạng thái</dt><dd>{product.status === 'released' ? 'Đã phát hành' : 'Sắp ra mắt'}</dd></div><div><dt>Quảng cáo</dt><dd>{product.ads ? 'Có' : 'Không'}</dd></div></dl><div className="product-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="legal-links"><a href={`/san-pham/${product.slug}/chinh-sach-bao-mat/`}>Chính sách quyền riêng tư</a><a href={`/san-pham/${product.slug}/dieu-khoan/`}>Điều khoản sử dụng</a></p></aside>
    </section>
    {related.length > 0 && <section className="related launch-related" aria-labelledby="related-heading"><div className="launch-section-top"><div><p className="eyebrow">CÙNG DANH MỤC</p><h2 id="related-heading">Sản phẩm khác</h2></div><a className="launch-link" href={`/${category.slug}/`}>Xem danh mục <Icon name="external" size={17} /></a></div><div className="product-grid">{related.map(p => <ProductCard key={p.slug} product={p} />)}</div></section>}
  </main><Footer /></div>;
}
