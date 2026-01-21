import { AIService, Category } from '@/types';
import aiServicesBaseData from '@/../data/ai-services.json';
import categoriesBaseData from '@/../data/categories.json';
import { defaultLocale, Locale, getDictionary } from '@/lib/i18n';
import zhServices from '@/../locales/services.zh';
import enServices from '@/../locales/services.en';
import jaServices from '@/../locales/services.ja';
import koServices from '@/../locales/services.ko';
import frServices from '@/../locales/services.fr';

const servicesTranslations = {
  zh: zhServices,
  en: enServices,
  ja: jaServices,
  ko: koServices,
  fr: frServices,
};

// 缓存已合并的服务数据，避免重复计算
const servicesCache = new Map<Locale, AIService[]>();
// 缓存分类数据
const categoriesCache = new Map<Locale, Category[]>();

export function getAllAIServices(locale: Locale = defaultLocale): AIService[] {
  // 检查缓存
  if (servicesCache.has(locale)) {
    return servicesCache.get(locale)!;
  }

  // 合并基础数据和翻译
  const translations = servicesTranslations[locale];
  const services = aiServicesBaseData.map(base => {
    const translation = translations[base.id as keyof typeof translations];
    return {
      ...base,
      name: translation?.name || base.id,
      description: translation?.description || '',
      tags: translation?.tags || [],
    };
  }) as AIService[];

  // 存入缓存
  servicesCache.set(locale, services);
  return services;
}

export function getAIServiceById(id: string, locale: Locale = defaultLocale): AIService | undefined {
  return getAllAIServices(locale).find(service => service.id === id);
}

export function getAIServicesByCategory(categoryId: string, locale: Locale = defaultLocale): AIService[] {
  return getAllAIServices(locale).filter(service => service.category === categoryId);
}

export function getFeaturedAIServices(locale: Locale = defaultLocale): AIService[] {
  return getAllAIServices(locale).filter(service => service.featured);
}

export function getAllCategories(locale: Locale = defaultLocale): Category[] {
  // 检查缓存
  if (categoriesCache.has(locale)) {
    return categoriesCache.get(locale)!;
  }

  // 合并基础数据和翻译
  const dict = getDictionary(locale);
  const categories = categoriesBaseData.map(base => ({
    id: base.id,
    icon: base.icon,
    name: dict.categories[base.id]?.name || base.id,
    description: dict.categories[base.id]?.description || '',
  }));

  // 存入缓存
  categoriesCache.set(locale, categories);
  return categories;
}

export function getCategoryById(id: string, locale: Locale = defaultLocale): Category | undefined {
  return getAllCategories(locale).find(category => category.id === id);
}

export function searchAIServices(query: string, locale: Locale = defaultLocale): AIService[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllAIServices(locale).filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
