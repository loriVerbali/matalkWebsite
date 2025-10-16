// Stripe TypeScript declarations

interface StripeCheckout {
  mount: (selector: string) => void;
  destroy: () => void;
  on: (event: string, callback: () => void) => void;
}

interface StripeInstance {
  initEmbeddedCheckout: (options: {
    clientSecret: string;
  }) => Promise<StripeCheckout>;
}

interface Window {
  Stripe: (publishableKey: string) => StripeInstance;
}
