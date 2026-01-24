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
  rating?: ServiceRating;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Review {
  id: string;
  service_id: string;
  rating: number;        // 1-5
  title?: string;
  content: string;
  helpful_count: number;
  unhelpful_count: number;
  created_at: string;
  language: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ServiceRating {
  id: string;
  service_id: string;
  average_score: number;  // 0-5
  review_count: number;
  created_at: string;
  updated_at: string;
}
