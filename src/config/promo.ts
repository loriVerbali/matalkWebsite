/**
 * Back to School promotion (Aug 17 – Sep 30).
 *
 * Flip `enabled` to false when the promo ends: that hides the top banner, the
 * strikethrough regular price and the green "save" strip on the Forever card,
 * and MaTalk AI Forever falls back to its regular price everywhere.
 */
export const PROMO = {
  enabled: true,
  name: "Back to School Special",
  /** Shown next to the banner headline. */
  window: "Aug 17 – Sep 30",
  endsCopy: "Special ends September 30",
} as const;

/** MaTalk AI Forever — one-time license. */
export const FOREVER_PRICE = {
  regular: 300,
  promo: 200,
} as const;

/** MaTalk AI — subscription. */
export const SUBSCRIPTION_PRICE = {
  monthly: 4.99,
  yearly: 49.99,
} as const;

export const APP_LINKS = {
  subscriptionIos: "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
  subscriptionAndroid:
    "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
  foreverIos: "https://apps.apple.com/us/app/matalk-ai-forever/id6756188044",
} as const;

export const CALENDLY_DEMO_URL =
  "https://calendly.com/shay-verbali/matalk-ai-forever-demo";

const formatPrice = (value: number) =>
  Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;

/** "$200" while the promo runs, "$300" once it is switched off. */
export const foreverPriceLabel = () =>
  formatPrice(PROMO.enabled ? FOREVER_PRICE.promo : FOREVER_PRICE.regular);

export const foreverRegularLabel = () => formatPrice(FOREVER_PRICE.regular);

/** 33 for $300 → $200. */
export const foreverDiscountPercent = () =>
  Math.round(
    ((FOREVER_PRICE.regular - FOREVER_PRICE.promo) / FOREVER_PRICE.regular) * 100
  );

export const monthlyPriceLabel = () => formatPrice(SUBSCRIPTION_PRICE.monthly);
export const yearlyPriceLabel = () => formatPrice(SUBSCRIPTION_PRICE.yearly);

/** How many months of the monthly plan the yearly price saves — "2 months free". */
export const yearlyMonthsFree = () =>
  Math.round(
    (SUBSCRIPTION_PRICE.monthly * 12 - SUBSCRIPTION_PRICE.yearly) /
      SUBSCRIPTION_PRICE.monthly
  );
