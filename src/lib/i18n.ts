import zhTranslations from '@/../locales/zh';
import enTranslations from '@/../locales/en';
import jaTranslations from '@/../locales/ja';
import koTranslations from '@/../locales/ko';
import frTranslations from '@/../locales/fr';

export const locales = ['en', 'zh', 'ja', 'ko', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
};

export type Dictionary = {
  brand: string;
  siteName: string;
  siteDescription: string;
  keywords: string[];
  nav: {
    home: string;
    search: string;
    submit: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  stats: {
    tools: string;
    categories: string;
    featured: string;
  };
  sections: {
    browseCategories: string;
    featured: string;
  };
  search: {
    title: string;
    results: (query: string, count: number) => string;
    noResultsTitle: string;
    noResultsHint: string;
    emptyTitle: string;
    emptyHint: string;
    placeholder: string;
    button: string;
  };
  category: {
    count: (count: number) => string;
    empty: string;
  };
  submit: {
    title: string;
    subtitle: string;
    flowTitle: string;
    flowSteps: Array<{ title: string; description: string }>;
    requirementsTitle: string;
    requirements: string[];
  };
  submitForm: {
    labels: {
      name: string;
      url: string;
      description: string;
      category: string;
      pricing: string;
      tags: string;
      email: string;
    };
    placeholders: {
      name: string;
      url: string;
      description: string;
      tags: string;
      email: string;
    };
    tagsHint: string;
    emailHint: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    tip: string;
  };
  pricing: {
    free: string;
    freemium: string;
    paid: string;
  };
  footer: {
    copyright: string;
    submit: string;
    github: string;
  };
  language: {
    switchLabel: string;
  };
  categories: Record<string, { name: string; description: string }>;
};

const dictionaries: Record<Locale, Dictionary> = {
  zh: zhTranslations,
  en: enTranslations,
  ja: jaTranslations,
  ko: koTranslations,
  fr: frTranslations,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getPricingLabel(locale: Locale, pricing: 'free' | 'freemium' | 'paid'): string {
  return getDictionary(locale).pricing[pricing];
}
