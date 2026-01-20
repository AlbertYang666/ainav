import { AIService, Category } from '@/types';
import aiServicesData from '@/../data/ai-services.json';
import categoriesData from '@/../data/categories.json';

export function getAllAIServices(): AIService[] {
  return aiServicesData as AIService[];
}

export function getAIServiceById(id: string): AIService | undefined {
  return getAllAIServices().find(service => service.id === id);
}

export function getAIServicesByCategory(categoryId: string): AIService[] {
  return getAllAIServices().filter(service => service.category === categoryId);
}

export function getFeaturedAIServices(): AIService[] {
  return getAllAIServices().filter(service => service.featured);
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryById(id: string): Category | undefined {
  return getAllCategories().find(category => category.id === id);
}

export function searchAIServices(query: string): AIService[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllAIServices().filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
