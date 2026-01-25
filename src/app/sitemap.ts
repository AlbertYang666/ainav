import { getAllCategories, getAllAIServices } from '@/lib/data';
import { locales } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://ainav.space';
  const categories = getAllCategories();
  const services = getAllAIServices('zh'); // 获取所有服务

  // 分类页面
  const categoryUrls = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${baseUrl}/${locale}/category/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // 服务详情页面
  const serviceUrls = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${baseUrl}/${locale}/service/${service.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // 主要页面
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
    {
      url: `${baseUrl}/${locale}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/${locale}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
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
    ...serviceUrls,
  ];
}
