import { getAllCategories } from '@/lib/data';
import { locales } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://ainav.space';
  const categories = getAllCategories();

  const categoryUrls = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${baseUrl}/${locale}/category/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  const localePages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/${locale}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    ...localePages,
    ...categoryUrls,
  ];
}
