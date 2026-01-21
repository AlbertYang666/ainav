import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPageClient from '@/components/SearchPageClient';
import { generateSEO } from '@/lib/seo';
import { getDictionary, Locale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang);

  return generateSEO({
    locale: lang,
    title: dictionary.search.title,
    description: dictionary.search.title,
    url: `/${lang}/search`,
  });
}

export default async function SearchPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">加载中...</div>}>
      <SearchPageClient locale={lang} />
    </Suspense>
  );
}
