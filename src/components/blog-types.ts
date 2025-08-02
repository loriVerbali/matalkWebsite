export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
  readTime: number; // in minutes
}

export interface BlogFilters {
  tag?: string;
  featured?: boolean;
  author?: string;
}