import { getAllAIServices, getAllCategories } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://ainav.space';
  const categories = getAllCategories();
  const services = getAllAIServices();

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    ...categoryUrls,
  ];
}
