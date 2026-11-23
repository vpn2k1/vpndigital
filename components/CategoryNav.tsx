import type { Locale } from '@/config/i18n';
import { categoryHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { categories } from '@/content/catalog';
import { Icon } from './Icon';

export function CategoryNav({ active, locale }: { active: string; locale: Locale }) {
  const s = getStrings(locale);
  return <nav className="category-nav" aria-label={s.categoryPage.areas}>
    <span className="category-nav-title">{s.categoryPage.areas}</span>
    {categories.map(category => <a href={categoryHref(locale, category.slug)} key={category.slug}
      aria-current={active === category.slug ? 'page' : undefined}>
      {s.categoryContent[category.slug].name}
      {active === category.slug && <Icon name="arrow" size={15}/>}
    </a>)}
  </nav>;
}
