import type { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  locale?: Locale;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

const siteConfig = {
  url: 'https://ainav.space',
  ogImage: 'https://ainav.space/og-image.png',
  siteName: 'AI Nav',
  twitter: '@ainav_space',
};

export function generateSEO({
  title,
  description,
  keywords,
  ogImage = siteConfig.ogImage,
  url = siteConfig.url,
  locale = 'zh',
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps = {}): Metadata {
  const dictionary = getDictionary(locale);
  const finalDescription = description ?? dictionary.siteDescription;
  const finalKeywords = keywords ?? dictionary.keywords;
  const fullTitle = title ? `${title} | ${dictionary.siteName}` : dictionary.siteName;

  const localeMap: Record<string, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    ja: 'ja_JP',
    ko: 'ko_KR',
    fr: 'fr_FR',
  };

  return {
    title: fullTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: siteConfig.siteName }],
    creator: siteConfig.siteName,
    publisher: siteConfig.siteName,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `${siteConfig.url}/zh`,
        'en-US': `${siteConfig.url}/en`,
        'ja-JP': `${siteConfig.url}/ja`,
        'ko-KR': `${siteConfig.url}/ko`,
        'fr-FR': `${siteConfig.url}/fr`,
      },
    },
    openGraph: {
      type,
      locale: localeMap[locale] || 'zh_CN',
      url,
      title: fullTitle,
      description: finalDescription,
      siteName: dictionary.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: fullTitle,
      description: finalDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

// JSON-LD 结构化数据生成器
export function generateWebsiteSchema(locale: Locale) {
  const dictionary = getDictionary(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: dictionary.siteName,
    url: siteConfig.url,
    description: dictionary.siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      'https://twitter.com/ainav_space',
      'https://github.com/ainav',
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema({
  name,
  description,
  url,
  image,
  rating,
  reviewCount,
  category,
  pricing,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
}) {
  const offers = {
    '@type': 'Offer',
    price: pricing === 'free' ? '0' : undefined,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    image: image || siteConfig.ogImage,
    applicationCategory: category,
    offers,
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toFixed(1),
        reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };
}

export { siteConfig };
