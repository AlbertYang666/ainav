export interface AIService {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  pricing?: 'free' | 'freemium' | 'paid';
  language?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}
