export interface FAQItem {
  question: string;
  answer: string;
  hasAction?: boolean;
  actionText?: string;
  actionType?: string;
}

export interface FAQProps {
  onNavigate?: (page: 'feature-request' | 'language-request' | 'faq' | 'pricing') => void;
}