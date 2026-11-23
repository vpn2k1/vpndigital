'use client';

import { isLocale } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSwitcher() {
  const { locale, changeLanguage } = useLanguage();
  const copy = getStrings(locale).language;
  return <label className="language-switcher">
    <span className="sr-only">{copy.label}</span>
    <select aria-label={copy.label} value={locale} onChange={event => {
      if (isLocale(event.target.value)) changeLanguage(event.target.value);
    }}>
      <option value="en" lang="en">EN</option>
      <option value="vi" lang="vi">VI</option>
    </select>
  </label>;
}
