import zhTranslations from '@/../locales/zh';
import enTranslations from '@/../locales/en';
import jaTranslations from '@/../locales/ja';
import koTranslations from '@/../locales/ko';
import frTranslations from '@/../locales/fr';
import zhPages from '@/../locales/pages.zh';
import enPages from '@/../locales/pages.en';
import jaPages from '@/../locales/pages.ja';
import koPages from '@/../locales/pages.ko';
import frPages from '@/../locales/pages.fr';

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
    about: string;
    submit: string;
    bookmarks: string;
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
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    button: string;
    privacy: string;
  };
  unsubscribe: {
    successTitle: string;
    emailRemoved: string;
    noMoreEmails: string;
    changedMind: string;
    returnHome: string;
    safetyNote: string;
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
    filters: {
      category: string;
      allCategories: string;
      sortBy: string;
      relevance: string;
      rating: string;
      reviewCount: string;
      nameAsc: string;
      nameDesc: string;
    };
  };
  serviceDetail: {
    backToCategory: string;
    visitWebsite: string;
    features: string;
    keyFeatures: string;
    useCases: string;
    howToUse: string;
    quickStart: string;
    faq: string;
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
    tagline: string;
    product: {
      title: string;
      home: string;
      search: string;
      submit: string;
    };
    resources: {
      title: string;
      github: string;
      blog: string;
      aboutUs: string;
    };
    connect: {
      title: string;
    };
    legal?: {
      privacy: string;
      terms: string;
    };
  };
  language: {
    switchLabel: string;
  };
  common?: {
    back?: string;
    visit?: string;
  };
  compare: {
    title: string;
    description: string;
  };
  about?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    title: string;
    subtitle: string;
    missionLabel: string;
    missionTitle: string;
    missionText1: string;
    missionText2: string;
    stats: {
      tools: string;
      categories: string;
      users: string;
      languages: string;
    };
    valuesTitle: string;
    valuesSubtitle: string;
    values: {
      community: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      innovation: {
        title: string;
        description: string;
      };
    };
    businessLabel: string;
    businessTitle: string;
    businessDescription: string;
    business: {
      free: {
        title: string;
        description: string;
      };
      premium: {
        title: string;
        description: string;
      };
    };
    legalLabel: string;
    legalTitle: string;
    legal: {
      privacy: {
        title: string;
        description: string;
        link: string;
      };
      dataProtection: {
        title: string;
        description: string;
      };
      terms: {
        title: string;
        description: string;
        link: string;
      };
      disclaimer: {
        title: string;
        description: string;
      };
    };
    contactTitle: string;
    contactDescription: string;
    submitTool: string;
    contactUs: string;
  };
  privacy?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    badge: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    quickNav: string;
    introduction: string;
    sections: {
      dataCollection: {
        title: string;
        description: string;
        items: {
          account: {
            title: string;
            description: string;
          };
          newsletter: {
            title: string;
            description: string;
          };
          submission: {
            title: string;
            description: string;
          };
          usage: {
            title: string;
            description: string;
          };
        };
      };
      dataUsage: {
        title: string;
        description: string;
        purposes: string[];
      };
      dataSecurity: {
        title: string;
        description: string;
        measures: string[];
      };
      yourRights: {
        title: string;
        description: string;
        rights: Array<{
          title: string;
          description: string;
        }>;
      };
      cookies: {
        title: string;
        description: string;
        types: Array<{
          name: string;
          purpose: string;
        }>;
      };
      thirdParty: {
        title: string;
        description: string;
        services: Array<{
          name: string;
          purpose: string;
          link: string;
        }>;
        viewPolicy: string;
      };
      international: {
        title: string;
        description: string;
      };
      contact: {
        title: string;
        description: string;
      };
    };
  };
  terms?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    badge: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    quickNav: string;
    introduction: string;
    sections: {
      acceptance: {
        title: string;
        description: string;
      };
      services: {
        title: string;
        description: string;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
      userConduct: {
        title: string;
        description: string;
        prohibited: {
          title: string;
          items: string[];
        };
      };
      content: {
        title: string;
        description: string;
        ownership: {
          title: string;
          description: string;
        };
        moderation: {
          title: string;
          description: string;
        };
        responsibility: {
          title: string;
          description: string;
        };
      };
      intellectual: {
        title: string;
        description: string;
        aiTools: string;
      };
      disclaimer: {
        title: string;
        description: string;
        items: string[];
      };
      liability: {
        title: string;
        description: string;
        limitations: string[];
      };
      termination: {
        title: string;
        description: string;
        reasons: string[];
        effect: string;
      };
      changes: {
        title: string;
        content: string;
      };
      contact: {
        title: string;
        description: string;
      };
    };
  };
  reviews: {
    title: string;
    ratingLabels: Record<number, string>;
    basedOn: (count: number) => string;
    shareTitle: string;
    submit: {
      button: string;
      submitting: string;
      submitted: string;
      successMessage: string;
      errorTooShort: string;
      errorTooLong: string;
      minLength: number;
      maxLength: number;
      titlePlaceholder: string;
      contentPlaceholder: string;
    };
    loading: string;
    recentTitle: string;
    noReviews: string;
    noReviewsHint: string;
    helpful: string;
    notHelpful: string;
    alreadyVoted: string;
    voteError: string;
    votedHelpful: string;
    votedUnhelpful: string;
    pagination: {
      previous: string;
      next: string;
      pageInfo: (page: number, totalPages: number) => string;
    };
  };
  categories: Record<string, { name: string; description: string }>;
};

const dictionaries: Record<Locale, Dictionary> = {
  zh: { ...zhTranslations, ...zhPages },
  en: { ...enTranslations, ...enPages },
  ja: { ...jaTranslations, ...jaPages },
  ko: { ...koTranslations, ...koPages },
  fr: { ...frTranslations, ...frPages },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getPricingLabel(locale: Locale, pricing: 'free' | 'freemium' | 'paid'): string {
  return getDictionary(locale).pricing[pricing];
}
