import { categories } from '@/content/catalog';
import { Icon } from './Icon';

export function CategoryNav({ active }: { active: string }) {
  return <nav className="category-nav" aria-label="Chuyển danh mục">
    <span className="category-nav-title">LĨNH VỰC</span>
    {categories.map(category => <a href={'/' + category.slug + '/'} key={category.slug} aria-current={active === category.slug ? 'page' : undefined}>{category.name} {active === category.slug && <Icon name="arrow" size={15}/>}</a>)}
  </nav>;
}
