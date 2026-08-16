import { useState } from "react";
import { analytics } from "../utils/analytics";
import { ScheduleDemoModal } from "./ScheduleDemoModal";
import {
  APP_LINKS,
  PROMO,
  foreverDiscountPercent,
  foreverPriceLabel,
  foreverRegularLabel,
  monthlyPriceLabel,
  yearlyMonthsFree,
  yearlyPriceLabel,
} from "../config/promo";

const appStoreButton = "/images/black.svg";
const googlePlayButton = "/images/Google_Play_Store_badge_EN.svg";
const matalkIcon = "/images/matalk-ai-icon.png";
const matalkForeverIcon = "/images/matalk-ai-forever-icon.png";

interface PlanCardsProps {
  /** Analytics location, e.g. "hero_section" or "pricing_page". */
  location: string;
  /** The pricing page shows the same cards a size up. */
  size?: "default" | "large";
}

/**
 * MaTalk AI (subscription) and MaTalk AI Forever (one-time) side by side.
 * Shared by the homepage hero and the pricing page so the two never drift.
 */
export function PlanCards({ location, size = "default" }: PlanCardsProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const isYearly = billing === "yearly";
  const monthsFree = yearlyMonthsFree();
  const isLarge = size === "large";

  const iconClasses = isLarge
    ? "relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shadow-lg"
    : "relative w-24 h-24 sm:w-[104px] sm:h-[104px] rounded-3xl shadow-lg";
  const priceClasses = isLarge
    ? "text-[42px] sm:text-5xl font-extrabold tracking-tight"
    : "text-4xl sm:text-[42px] font-extrabold tracking-tight";
  const titleClasses = isLarge
    ? "relative text-2xl sm:text-[25px] font-extrabold text-slate-900"
    : "relative text-2xl font-extrabold text-slate-900";

  const openStore = (
    url: string,
    eventName: string,
    destination: string,
    app: string
  ) => {
    analytics.trackInteraction(eventName, {
      location,
      destination,
      app,
    });
    window.open(url, "_blank");
  };

  const tabClasses = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-bold min-h-[32px] flex items-center gap-1.5 transition-all ${
      active
        ? "bg-white text-indigo-600 shadow-sm"
        : "bg-transparent text-slate-500 hover:text-slate-700"
    }`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-7 items-stretch max-w-4xl mx-auto">
      {/* MaTalk AI — subscription */}
      <div className="relative pt-4">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-[0.06em] whitespace-nowrap shadow-lg shadow-violet-500/30">
            FOR FAMILIES
          </span>
        </div>
        <div className="bg-white rounded-3xl border-2 border-violet-300 shadow-xl shadow-violet-500/10 px-6 sm:px-7 pt-9 pb-7 h-full flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-70" />

          <img
            src={matalkIcon}
            alt="MaTalk AI app icon"
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className={iconClasses}
          />
          <h3 className={titleClasses}>MaTalk AI</h3>

          {/* Billing toggle */}
          <div className="relative bg-indigo-50 border border-violet-200 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={tabClasses(!isYearly)}
              aria-pressed={!isYearly}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={tabClasses(isYearly)}
              aria-pressed={isYearly}
            >
              Yearly
              {monthsFree > 0 && (
                <span className="bg-green-100 text-emerald-700 text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {monthsFree} months free
                </span>
              )}
            </button>
          </div>

          <div className="relative flex items-baseline justify-center gap-2">
            <span className={`${priceClasses} text-violet-600`}>
              {isYearly ? yearlyPriceLabel() : monthlyPriceLabel()}
            </span>
            <span className="text-base text-slate-600">
              {isYearly ? "/ year" : "/ month"}
            </span>
          </div>

          <p className="relative text-[15px] leading-relaxed text-slate-600">
            7-day free trial, no credit card needed. Cancel anytime.
          </p>

          <div className="relative mt-auto pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() =>
                openStore(
                  APP_LINKS.subscriptionIos,
                  "App Store Click",
                  "app_store",
                  "matalk_ai"
                )
              }
              className="group transition-all duration-200 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
              aria-label="Download Matalk AI on the App Store"
            >
              <img
                src={appStoreButton}
                alt="Download on the App Store"
                width={150}
                height={50}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
            </button>
            <button
              onClick={() =>
                openStore(
                  APP_LINKS.subscriptionAndroid,
                  "Google Play Click",
                  "google_play",
                  "matalk_ai"
                )
              }
              className="group transition-all duration-200 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
              aria-label="Download Matalk AI on Google Play"
            >
              <img
                src={googlePlayButton}
                alt="Get it on Google Play"
                width={150}
                height={50}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MaTalk AI Forever — one-time */}
      <div className="relative pt-4">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-[0.06em] whitespace-nowrap shadow-lg shadow-blue-500/30">
            FOR SCHOOLS &amp; CLINICS
          </span>
        </div>
        <div className="bg-white rounded-3xl border-2 border-blue-300 shadow-xl shadow-blue-500/10 px-6 sm:px-7 pt-9 pb-7 h-full flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-80" />

          <img
            src={matalkForeverIcon}
            alt="MaTalk AI Forever app icon"
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className={iconClasses}
          />
          <h3 className={titleClasses}>MaTalk AI Forever</h3>

          <div className="relative bg-blue-50 border border-blue-200 rounded-full p-1 flex">
            <span className="px-3.5 py-1.5 rounded-full text-[13px] font-bold text-blue-700 bg-white shadow-sm min-h-[32px] flex items-center">
              One payment
            </span>
          </div>

          <div className="relative flex items-baseline justify-center gap-2 flex-wrap">
            <span className={`${priceClasses} text-blue-600`}>
              {foreverPriceLabel()}
            </span>
            {PROMO.enabled && (
              <span className="text-lg text-slate-400 line-through">
                {foreverRegularLabel()}
              </span>
            )}
            <span className="text-base text-slate-600">one-time</span>
          </div>

          <p className="relative text-[15px] leading-relaxed text-slate-600">
            A permanent license, per seat. No renewal, ever — what schools and
            clinics choose.
          </p>

          {PROMO.enabled && (
            <div className="relative self-stretch bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-xl px-4 py-2.5 flex flex-col items-center gap-0.5">
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase">
                {PROMO.name} · Save {foreverDiscountPercent()}%
              </span>
              <span className="text-[13px] font-semibold opacity-90">
                {PROMO.endsCopy}
              </span>
            </div>
          )}

          <div className="relative mt-auto pt-2 flex justify-center">
            <button
              onClick={() =>
                openStore(
                  APP_LINKS.foreverIos,
                  "App Store Click",
                  "app_store",
                  "matalk_ai_forever"
                )
              }
              className="group transition-all duration-200 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-blue-500/20 touch-target"
              aria-label="Download Matalk AI Forever on the App Store"
            >
              <img
                src={appStoreButton}
                alt="Download on the App Store"
                width={150}
                height={50}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "Schedule a demo" box that sits under the plan cards. Owns the modal, so the
 * hero and the pricing page get exactly the same booking flow.
 */
export function ScheduleDemoCTA({ location }: { location: string }) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-2xl px-6 sm:px-7 py-6 flex flex-col items-center gap-4 text-center">
      <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
        For schools and clinics: both apps support Apple School Manager and
        Apple Business Manager.
      </h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button
          onClick={() => {
            analytics.trackInteraction("Schedule Demo Open", { location });
            setIsDemoOpen(true);
          }}
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-[15px] min-h-[48px] whitespace-nowrap hover:opacity-90 transition-opacity touch-target"
        >
          Schedule a demo
        </button>
        <span className="text-[15px] text-slate-600">
          or reach out to{" "}
          <a
            href="mailto:info@verbali.io"
            className="font-semibold text-violet-600 hover:underline"
          >
            info@verbali.io
          </a>
        </span>
      </div>

      <ScheduleDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}
