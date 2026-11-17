import { company } from '@/content/company';
import { categories } from '@/content/catalog';
import { Icon } from './Icon';
export function Footer() {
  return <footer className="footer"><div className="container footer-top"><a className="footer-brand" href="/"><span className="footer-mark footer-theme-logo" aria-hidden="true" />{company.name}</a><nav className="footer-nav" aria-label="Danh mục cuối trang">{categories.map(c => <a key={c.slug} href={`/${c.slug}/`}>{c.name}</a>)}</nav><a className="back-top" href="#top">Về đầu trang <Icon name="up" size={18}/></a></div><div className="container footer-bottom"><span>{company.shortName} · Công nghệ số Phương Nam</span><span>MST: {company.taxId}</span><span>Hưng Yên, Việt Nam</span></div></footer>;
}
