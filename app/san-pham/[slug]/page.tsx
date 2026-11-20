import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProduct, getProductsByCategory } from '@/lib/products';
import { getCategory } from '@/content/catalog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Artwork } from '@/components/Artwork';
import { ProductCard } from '@/components/ProductCard';
import { siteUrl } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.name} — Sắp ra mắt | PhuongNam Digital`;
  return { title, description: `${p.summary} Ý tưởng hiện đang được chuẩn bị, chưa có chức năng sử dụng.`, ...(siteUrl ? { alternates: { canonical: `/san-pham/${p.slug}/` } } : {}), openGraph: { title, description: p.summary, ...(siteUrl ? { url: `/san-pham/${p.slug}/`, images: [{ url: p.image, width: 1600, height: 1067, alt: p.imageAlt }] } : {}) } };
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
        <span className="launch-pill"><span className="launch-dot" aria-hidden="true" /> SẮP RA MẮT</span>
        <h1 id="product-heading">{product.name}<span className="launch-period">.</span></h1>
        <p className="launch-detail-subtitle">{product.subtitle}</p>
        <p className="launch-description">{product.summary}</p>
        <div className="launch-notice"><strong>Đang trong quá trình phát triển</strong><span>Đây là bản giới thiệu ý tưởng. Chức năng chưa khả dụng, chưa có phiên bản chơi thử hoặc tải xuống. Ngày ra mắt chưa được công bố.</span></div>
        <div className="launch-actions"><a className="button" href={`/${category.slug}/`}>Khám phá {category.name} <span aria-hidden="true">↗</span></a><a className="launch-link" href="/#lien-he">Liên hệ <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="launch-detail-art" data-reveal><Artwork src={product.image} alt={product.imageAlt} priority sizes="(max-width: 760px) 100vw, 50vw" /><span>HÌNH ẢNH Ý TƯỞNG / CHƯA PHÁT HÀNH</span></div>
    </section>
    <section className="launch-detail-info" data-reveal aria-label="Thông tin ý tưởng">
      <div><p className="eyebrow">VỀ Ý TƯỞNG</p><h2>Được hình dung để tạo khác biệt.</h2><p>{product.description}</p><h3>Hướng tính năng dự kiến</h3><ul className="feature-list">{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul><p className="launch-disclaimer">Các tính năng trên chỉ mang tính định hướng và có thể thay đổi khi phát triển.</p></div>
      <aside className="launch-facts"><p className="eyebrow">THÔNG TIN DỰ ÁN</p><dl><div><dt>Danh mục</dt><dd>{category.name}</dd></div><div><dt>Nền tảng dự kiến</dt><dd>{product.platform}</dd></div><div><dt>Trạng thái</dt><dd>Sắp ra mắt · Chưa phát hành</dd></div></dl><div className="product-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div></aside>
    </section>
    {related.length > 0 && <section className="related launch-related" aria-labelledby="related-heading"><div className="launch-section-top"><div><p className="eyebrow">CÙNG DANH MỤC</p><h2 id="related-heading">Ý tưởng khác</h2></div><a className="launch-link" href={`/${category.slug}/`}>Xem danh mục <span aria-hidden="true">↗</span></a></div><div className="product-grid">{related.map(p => <ProductCard key={p.slug} product={p} />)}</div></section>}
  </main><Footer /></div>;
}
