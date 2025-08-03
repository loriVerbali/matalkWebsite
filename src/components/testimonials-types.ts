export interface Testimonial {
  id: string;
  author: string;
  credentials?: string;
  role: string;
  company: string;
  email?: string;
  website?: string;
  quote: string;
  highlight: string;
  avatar: string;
  featured: boolean;
  displayed: boolean;
}
