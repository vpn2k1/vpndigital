import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/content/catalog';
import { getProductsByCategory } from '@/lib/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { Icon } from '@/components/Icon';
import { siteUrl } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return categories.map(category => ({ category: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const title = category.name + ' — Sắp ra mắt | VPN Digital';
  return {
    title, description: category.description + ' Các ý tưởng đang trong quá trình phát triển, chưa có bản phát hành.',
    ...(siteUrl ? { alternates: { canonical: '/' + category.slug + '/' } } : {}),
    openGraph: { title, description: category.description, ...(siteUrl ? { url: '/' + category.slug + '/', images: [{ url: category.image, width: 1600, height: 1067, alt: category.imageAlt }] } : {}) }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const list = getProductsByCategory(category.slug);
  const index = categories.findIndex(item => item.slug === category.slug) + 1;
  return <div className="site-shell" id="top">
    <a className="skip-link" href="#noi-dung">Đến nội dung chính</a>
    <Header />
    <main id="noi-dung">
      <div className="container">
        <nav className="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><Icon name="arrow" size={13}/><span aria-current="page">{category.name}</span></nav>
        <section className="category-hero" aria-labelledby="category-heading">
          <div className="category-hero-copy" data-reveal>
            <p className="section-eyebrow"><span>0{index} /</span> {category.eyebrow}</p>
            <div className="state-tag"><span className="status-dot" aria-hidden="true"/> SẮP RA MẮT</div>
            <h1 id="category-heading">{category.name}<span className="accent-period">.</span><small>{category.headline.split('\n').map((line, i) => <span key={i}>{line}</span>)}</small></h1>
            <p className="category-summary">{category.description}</p>
            <div className="availability-note"><Icon name="clock" size={20}/><p>Chúng tôi đang chuẩn bị những trải nghiệm thuộc lĩnh vực này. Hiện chưa có bản chơi thử, phần mềm hoạt động hoặc tệp tải xuống.</p></div>
            <div className="hero-actions"><a className="button button-primary" href="#y-tuong">Xem ý tưởng <Icon name="down" size={18}/></a><a className="button button-quiet" href="/#lien-he">Liên hệ <Icon name="external" size={17}/></a></div>
          </div>
          <div className="brand-stage brand-stage-category" data-reveal role="img" aria-label="Logo VPN Digital">
            <span className="brand-stage-orbit" aria-hidden="true"/>
            <span className="brand-stage-wordmark" aria-hidden="true"/>
            <span className="brand-stage-index" aria-hidden="true">{String(index).padStart(2, '0')} / 03</span>
          </div>
        </section>
        <CategoryNav active={category.slug}/>
        <section className="category-collection section" id="y-tuong" aria-labelledby="collection-heading">
          <div className="section-header" data-reveal><div><p className="section-eyebrow"><span>KHÁM PHÁ /</span> DANH MỤC {category.name.toUpperCase()}</p><h2 id="collection-heading">Ý tưởng hôm nay.<br/><span>Tiềm năng ngày mai.</span></h2></div><p>{String(list.length).padStart(2, '0')} concept đang phát triển. Mỗi trang giới thiệu định hướng sản phẩm; các chức năng chưa được phát hành.</p></div>
          <div className="product-grid category-products">{list.map((product, i) => <ProductCard key={product.slug} product={product} index={i}/>)}</div>
        </section>
        <section className="category-end-panel"><div><span className="section-eyebrow">MỌI ĐIỀU ĐỀU BẮT ĐẦU TỪ Ý TƯỞNG</span><h2>Chưa phải điểm đến cuối cùng.</h2><p>Những nội dung ở đây là bản giới thiệu định hướng. Khi có thông tin phát hành, chúng tôi sẽ cập nhật trên website.</p></div><a className="button button-primary" href="/#lien-he">Kết nối với chúng tôi <Icon name="arrow" size={17}/></a></section>
      </div>
    </main><Footer/>
  </div>;
}
