import { FAQProps } from './faq-types';

export function useFAQActions(onNavigate?: FAQProps['onNavigate']) {
  return (actionType: string) => {
    switch (actionType) {
      case 'android-updates':
        // Could open a modal or redirect to Android signup
        console.log('Android updates requested');
        break;
      case 'request-language':
        if (onNavigate) {
          onNavigate('language-request');
        } else {
          console.log('Language request initiated');
        }
        break;
      case 'suggest-feature':
        if (onNavigate) {
          onNavigate('feature-request');
        } else {
          console.log('Feature suggestion initiated');
        }
        break;
      case 'pricing':
        if (onNavigate) {
          onNavigate('pricing');
        } else {
          console.log('Pricing page navigation requested');
        }
        break;
    }
  };
}