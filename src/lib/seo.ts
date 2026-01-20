import type { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
}

const siteConfig = {
  name: 'AI导航 - ainav.space',
  description: '精选优质AI工具导航，收录ChatGPT、Midjourney等热门AI网站，助你高效探索人工智能世界',
  url: 'https://ainav.space',
  ogImage: 'https://ainav.space/og-image.png',
  keywords: ['AI导航', 'AI工具', 'ChatGPT', 'AI网站', '人工智能', 'AI助手', 'AI绘画'],
};

export function generateSEO({
  title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  ogImage = siteConfig.ogImage,
  url = siteConfig.url,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'AI Nav' }],
    creator: 'AI Nav',
    publisher: 'AI Nav',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
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
      description,
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
