import type { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  locale?: Locale;
}

const siteConfig = {
  url: 'https://ainav.space',
  ogImage: 'https://ainav.space/og-image.png',
};

export function generateSEO({
  title,
  description,
  keywords,
  ogImage = siteConfig.ogImage,
  url = siteConfig.url,
  locale = 'zh',
}: SEOProps = {}): Metadata {
  const dictionary = getDictionary(locale);
  const finalDescription = description ?? dictionary.siteDescription;
  const finalKeywords = keywords ?? dictionary.keywords;
  const fullTitle = title ? `${title} | ${dictionary.siteName}` : dictionary.siteName;

  return {
    title: fullTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: 'AI Nav' }],
    creator: 'AI Nav',
    publisher: 'AI Nav',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
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
    },
    twitter: {
      card: 'summary_large_image',
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
  };
}

export { siteConfig };
