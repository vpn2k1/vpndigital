import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProduct, getProductsByCategory } from '@/lib/products';
import { getCategory } from '@/content/catalog';
import { Header } from '@/components/Header';
import { BrandLockup } from '@/components/BrandLockup';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Icon } from '@/components/Icon';
import { siteUrl } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = product.name + ' — Sắp ra mắt | VPN Digital';
  return { title, description: product.summary + ' Đây là ý tưởng, chưa có chức năng sử dụng.', ...(siteUrl ? { alternates: { canonical: '/san-pham/' + slug + '/' } } : {}), openGraph: { title, description: product.summary, ...(siteUrl ? { url: '/san-pham/' + slug + '/', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VPN Digital' }] } : {}) } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const related = getProductsByCategory(product.category).filter(p => p.slug !== product.slug);
  return <div className="site-shell" id="top">
    <a className="skip-link" href="#noi-dung">Đến nội dung chính</a><Header/>
    <main id="noi-dung">
      <div className="container">
        <nav className="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><Icon name="arrow" size={13}/><a href={'/' + category.slug + '/'}>{category.name}</a><Icon name="arrow" size={13}/><span aria-current="page">{product.name}</span></nav>
        <section className="detail-hero" aria-labelledby="detail-heading">
          <div className="detail-main" data-reveal>
            <p className="section-eyebrow"><span>VPN DIGITAL /</span> {category.name.toUpperCase()}</p>
            <span className="state-tag"><span className="status-dot" aria-hidden="true"/> SẮP RA MẮT</span>
            <h1 id="detail-heading">{product.name}<span className="accent-period">.</span></h1>
            <p className="detail-subtitle">{product.subtitle}</p>
            <p className="detail-summary">{product.summary}</p>
            <div className="availability-note detail-availability"><Icon name="clock" size={20}/><div><strong>Hiện chưa khả dụng</strong><p>Đây là concept giới thiệu ý tưởng, chưa có chức năng để sử dụng, chơi thử hoặc tải xuống. Ngày ra mắt chưa được công bố.</p></div></div>
            <div className="hero-actions"><a className="button button-primary" href={'/' + category.slug + '/'}>Khám phá {category.name} <Icon name="arrow" size={18}/></a><a className="button button-quiet" href="/#lien-he">Liên hệ <Icon name="external" size={17}/></a></div>
          </div>
          <div className="brand-stage brand-stage-detail" data-reveal>
          <span className="brand-stage-orbit" aria-hidden="true"/>
          <BrandLockup variant="stage" />
          <span className="brand-stage-index" aria-hidden="true">CONCEPT / {category.name.toUpperCase()}</span>
        </div>
        </section>
        <section className="detail-content section" aria-labelledby="concept-heading">
          <div className="detail-story" data-reveal><p className="section-eyebrow"><span>01 /</span> VỀ Ý TƯỞNG</p><h2 id="concept-heading">Đằng sau concept<span className="accent-period">.</span></h2><p className="detail-description">{product.description}</p>
            <div className="feature-heading"><p className="section-eyebrow"><span>02 /</span> TÍNH NĂNG DỰ KIẾN</p><h3>Những điều đang được hình dung.</h3></div>
            <ol className="feature-list">{product.features.map((feature,i)=><li key={feature}><span className="feature-number">{String(i+1).padStart(2,'0')}</span><span>{feature}</span><Icon name="sparkle" size={18}/></li>)}</ol><p className="small-disclaimer">Thông tin và tính năng mang tính định hướng, có thể thay đổi khi phát triển.</p>
          </div>
          <aside className="detail-aside" data-reveal><p className="section-eyebrow">HỒ SƠ CONCEPT</p><div className="detail-aside-status"><span className="status-dot" aria-hidden="true"/> Chưa phát hành</div><dl><div><dt>Danh mục</dt><dd>{category.name}</dd></div><div><dt>Nền tảng dự kiến</dt><dd>{product.platform}</dd></div><div><dt>Trạng thái</dt><dd>Sắp ra mắt</dd></div></dl><div className="detail-tags">{product.tags.map(tag=><span key={tag}>{tag}</span>)}</div></aside>
        </section>
        {related.length > 0 && <section className="section related-section" aria-labelledby="related-heading"><div className="section-header"><div><p className="section-eyebrow"><span>03 /</span> CÙNG LĨNH VỰC</p><h2 id="related-heading">Tiếp tục khám phá.</h2></div><a href={'/' + category.slug + '/'} className="inline-link">Tất cả {category.name} <Icon name="arrow" size={17}/></a></div><div className="product-grid related-products">{related.map((p,i)=><ProductCard product={p} key={p.slug} index={i}/>)}</div></section>}
      </div>
    </main><Footer/>
  </div>;
}
