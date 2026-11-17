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
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> { const { category: slug } = await params; const c = getCategory(slug); if (!c) return {}; return { title: `${c.name} | PhuongNam Digital`, description: c.description, ...(siteUrl ? { alternates: { canonical: `/${c.slug}/` } } : {}), openGraph: { title: `${c.name} | PhuongNam Digital`, description: c.description, ...(siteUrl ? { url: `/${c.slug}/`, images: [{ url: c.image, width: 1600, height: 1067, alt: c.imageAlt }] } : {}) } }; }
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
 const { category: slug } = await params; const category = getCategory(slug); if (!category) notFound(); const list = getProductsByCategory(category.slug);
 return <div id="top"><a className="skip-link" href="#noi-dung">Đến nội dung chính</a><Header/><main id="noi-dung"><div className="container"><nav className="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">{category.name}</span></nav><section className="catalog-hero" data-reveal><div><p className="eyebrow">{category.eyebrow}</p><h1>{category.headline.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br/>}</span>)}</h1><p className="catalog-description">{category.description}</p><a className="button" href="#danh-sach">Khám phá {category.name.toLowerCase()} <span aria-hidden="true">↓</span></a></div><Artwork src={category.image} alt={category.imageAlt} priority className="catalog-art"/></section><CategoryNav active={category.slug}/><section id="danh-sach" className="catalog-list"><div className="section-heading-row" data-reveal><div><p className="eyebrow">DANH MỤC {category.name.toUpperCase()}</p><h2>Ý tưởng đang được giới thiệu</h2></div><span className="catalog-count">{list.length} ý tưởng</span></div><p className="demo-notice"><span className="demo-badge">DEMO</span> Các mục có nhãn DEMO là ý tưởng minh họa, chưa phải sản phẩm đã phát hành. Hình ảnh là concept art.</p>{list.length ? <div className="product-grid category-grid">{list.map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <p className="empty-state">Danh mục đang được cập nhật. Bạn vui lòng quay lại sau.</p>}</section><section className="catalog-cta" data-reveal><div><p className="eyebrow">KẾT NỐI VỚI PHƯƠNG NAM</p><h2>Cùng trao đổi ý tưởng của bạn.</h2></div><a className="button" href="/#lien-he">Thông tin liên hệ <span aria-hidden="true">→</span></a></section></div></main><Footer/></div>;
}
