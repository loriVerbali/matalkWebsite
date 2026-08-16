import { useState } from "react";
import { X } from "lucide-react";
import { analytics } from "../utils/analytics";
import { PROMO, foreverDiscountPercent } from "../config/promo";

interface PromoBannerProps {
  onNavigate: (page: string) => void;
}

const DISMISSED_KEY = "verbali_promo_dismissed_back_to_school";

/** Back to School promo bar. Sits above the sticky header; dismissed for the session. */
export function PromoBanner({ onNavigate }: PromoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  if (!PROMO.enabled || isDismissed) return null;

  const handleDismiss = () => {
    analytics.trackInteraction("Promo Banner Dismiss", { promo: PROMO.name });
    try {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Private browsing — banner simply comes back on the next page load.
    }
    setIsDismissed(true);
  };

  const handleSeePricing = () => {
    analytics.trackInteraction("Promo Banner Click", {
      promo: PROMO.name,
      destination: "pricing",
    });
    onNavigate("pricing");
  };

  return (
    <div className="bg-gradient-to-r from-violet-600 via-indigo-500 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto mobile-container py-3">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
          {/* Badge */}
          <span className="md:justify-self-start self-center md:self-auto bg-white/20 border border-white/35 text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
            {PROMO.name}
          </span>

          {/* Headline */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
            <span className="text-[15px] font-semibold">
              Save {foreverDiscountPercent()}% on MaTalk AI Forever
            </span>
            <span className="text-sm opacity-80 whitespace-nowrap">
              {PROMO.window}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center md:justify-self-end gap-3 sm:gap-4">
            <button
              onClick={handleSeePricing}
              className="bg-white text-indigo-600 font-bold text-sm px-5 py-2 rounded-full whitespace-nowrap hover:bg-indigo-50 transition-colors touch-target"
            >
              See pricing
            </button>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss promotion banner"
              className="opacity-70 hover:opacity-100 transition-opacity p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
