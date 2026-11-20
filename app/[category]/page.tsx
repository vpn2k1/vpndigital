import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/content/catalog';
import { getProductsByCategory } from '@/lib/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Artwork } from '@/components/Artwork';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { siteUrl } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return categories.map(category => ({ category: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const title = `${category.name} — Sắp ra mắt | PhuongNam Digital`;
  return {
    title, description: `${category.description} Các dự án và chức năng hiện đang được chuẩn bị, chưa phát hành.`,
    ...(siteUrl ? { alternates: { canonical: `/${category.slug}/` } } : {}),
    openGraph: { title, description: category.description, ...(siteUrl ? { url: `/${category.slug}/`, images: [{ url: category.image, width: 1600, height: 1067, alt: category.imageAlt }] } : {}) }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = getProductsByCategory(category.slug);
  return <div id="top">
    <a className="skip-link" href="#noi-dung">Đến nội dung chính</a>
    <Header />
    <main id="noi-dung">
      <div className="container">
        <nav className="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">{category.name}</span></nav>
        <section className="launch-hero" aria-labelledby="launch-heading">
          <div className="launch-copy" data-reveal>
            <p className="launch-kicker"><span className="launch-dot" aria-hidden="true" /> DỰ ÁN ĐANG PHÁT TRIỂN <span className="launch-counter">/ 0{categories.findIndex(item => item.slug === category.slug) + 1}</span></p>
            <div className="launch-pill"><span className="launch-dot" aria-hidden="true" /> SẮP RA MẮT</div>
            <h1 id="launch-heading">{category.name}<span className="launch-period">.</span><br /><span className="launch-title-muted">Điều thú vị đang được tạo nên.</span></h1>
            <p className="launch-description">{category.description}</p>
            <p className="launch-notice">Chức năng trong danh mục này đang được xây dựng. Hiện chưa có phiên bản để trải nghiệm hoặc tải xuống.</p>
            <div className="launch-actions">
              <a className="button" href="#y-tuong">Khám phá ý tưởng <span aria-hidden="true">↓</span></a>
              <a className="launch-link" href="/#lien-he">Liên hệ với chúng tôi <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="launch-artwork" data-reveal><Artwork src={category.image} alt={category.imageAlt} priority sizes="(max-width: 760px) 100vw, 50vw" /><div className="launch-image-caption"><span>VPN DIGITAL / {category.name.toUpperCase()}</span><span>CONCEPT PREVIEW</span></div></div>
        </section>
        <CategoryNav active={category.slug} />
        <section id="y-tuong" className="launch-catalog" aria-labelledby="ideas-heading">
          <div className="launch-section-top" data-reveal><div><p className="eyebrow">KHÁM PHÁ NHỮNG GÌ SẮP TỚI</p><h2 id="ideas-heading">Ý tưởng đang phát triển<span className="launch-period">.</span></h2></div><span className="launch-count">{String(products.length).padStart(2, '0')} Ý TƯỞNG</span></div>
          <p className="launch-catalog-description">Các thẻ dưới đây giới thiệu hướng phát triển dự kiến. Nhấn vào một ý tưởng để xem thông tin; tất cả chức năng vẫn đang trong quá trình chuẩn bị.</p>
          {products.length ? <div className="product-grid category-grid">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div> : <p className="empty-state">Nội dung đang được cập nhật. Vui lòng quay lại sau.</p>}
        </section>
        <aside className="launch-bottom-cta" data-reveal><div><p className="eyebrow">CÙNG PHÁT TRIỂN NHỮNG Ý TƯỞNG MỚI</p><h2>Một điều mới đang bắt đầu.</h2><p>Khám phá PhuongNam Digital hoặc kết nối với chúng tôi để trao đổi về lĩnh vực bạn quan tâm.</p></div><a className="button" href="/#lien-he">Thông tin liên hệ <span aria-hidden="true">↗</span></a></aside>
      </div>
    </main><Footer />
  </div>;
}
