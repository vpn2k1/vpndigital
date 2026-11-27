import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { company } from '@/content/company';
import type { Product } from '@/lib/products';
export const legalEmail = company.email;
export function LegalPage({ product, title, children }: { product: Product; title: string; children: ReactNode }) {
  return <div id="top"><a className="skip-link" href="#noi-dung">Đến nội dung chính</a><Header /><main id="noi-dung" className="container legal">
    <nav className="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><a href={`/san-pham/${product.slug}/`}>{product.name}</a><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <h1>{title}</h1>
    <p className="legal-meta">Cập nhật lần cuối: {product.updated}</p>
    {/* Google Play requires the policy to name the app, developer and legal entity exactly as on the store listing */}
    <section><h2>Thông tin ứng dụng và nhà phát triển</h2>
      <p>Văn bản này áp dụng cho ứng dụng <strong>{product.name}</strong> ({product.subtitle}) do <strong>{company.shortName}</strong> phát triển và phát hành. Trong văn bản này, “chúng tôi” là {company.shortName}.</p>
      <ul>
        <li>Tên ứng dụng: {product.name} ({product.subtitle})</li>
        {product.packageId && <li>Mã ứng dụng (package name): {product.packageId}</li>}
        <li>Nhà phát triển: {company.shortName}</li>
        <li>Pháp nhân: {company.legalName} ({company.internationalName}), MST {company.taxId}</li>
        <li>Địa chỉ: {company.address}</li>
        <li>Email: <a href={`mailto:${legalEmail}`}>{legalEmail}</a></li>
      </ul>
    </section>
    {children}
  </main><Footer /></div>;
}
