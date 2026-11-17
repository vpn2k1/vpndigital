import { categories } from '@/content/catalog';
export function CategoryNav({ active }: { active: string }) { return <nav className="category-nav" aria-label="Danh mục sản phẩm">{categories.map(category => <a href={`/${category.slug}/`} key={category.slug} aria-current={active === category.slug ? 'page' : undefined}>{category.name}</a>)}</nav>; }
