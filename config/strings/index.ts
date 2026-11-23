import type { Locale } from '@/config/i18n';
import en from './en';
import vi from './vi';

export const strings = { en, vi } as const;
export const getStrings = (locale: Locale) => strings[locale];
