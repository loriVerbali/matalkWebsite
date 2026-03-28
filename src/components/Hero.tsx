import { analytics } from "../utils/analytics";

// App Store button
const appStoreButton = "/images/black.svg";
const runningRobotDogWebp = "/images/chasingBall.webp";
const runningRobotDogPng = "/images/chasingBall.png";
import { motion } from "framer-motion";

/** Intrinsic size of optimized WebP (320×213); avoids CLS with object-contain in an 80×80 box. */
const HERO_MASCOT_WIDTH = 320;
const HERO_MASCOT_HEIGHT = 213;

export function Hero() {
  return (
    <section className="py-24 sm:mobile-section-padding bg-gradient-to-b from-purple-100/50 to-blue-100/50 relative overflow-hidden mobile-no-overflow">
      {/* Static Robot Dog on Section Border - Hidden on mobile for cleaner design */}
      <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-4 sm:left-6 lg:left-8 z-30 mobile-hide">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 0.95 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
        >
          <picture>
            <source srcSet={runningRobotDogWebp} type="image/webp" />
            <img
              src={runningRobotDogPng}
              alt="Matalk AI companion running"
              width={HERO_MASCOT_WIDTH}
              height={HERO_MASCOT_HEIGHT}
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-110 transition-all duration-300 opacity-95 hover:opacity-100"
            />
          </picture>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mobile-container">
        <div className="text-center max-w-4xl mx-auto mobile-text-center">
          {/* Headline — plain h1 so LCP text paints immediately (no Framer opacity:0 gate). */}
          <h1 className="h1 text-gradient mb-8 sm:mb-6">
            Verbali presents: AI-Powered AAC App for Non-Verbal Children
          </h1>

          {/* Subheadline */}
          <motion.p
            className="lead text-slate-700 mb-8 sm:mb-8 max-w-3xl mx-auto"
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Verbali is pioneering the next generation of{" "}
            <a href="#features" className="text-violet-600 hover:underline">
              AI-powered Augmentative and Alternative Communication (AAC)
            </a>{" "}
            tools, making communication more natural and accessible than ever
            before. Explore our{" "}
            <a href="/pricing" className="text-violet-600 hover:underline">
              pricing
            </a>{" "}
            or{" "}
            <a
              href="mailto:info@verbali.io"
              className="text-violet-600 hover:underline"
            >
              contact us
            </a>{" "}
            to learn more.
          </motion.p>

          {/* Catchphrase */}
          <motion.p
            className="text-lg sm:text-xl italic text-slate-600 mb-10 sm:mb-10 font-medium px-4"
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "Because the most meaningful conversation is a natural one"
          </motion.p>

          {/* Trial Card */}
          <motion.div
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card max-w-6xl mx-auto mb-8 sm:mb-10 py-8 sm:py-12 bg-gradient-to-br from-white/90 to-blue-50/80"
          >
            {/* Card Header */}
            <h3 className="h3 text-gradient mb-6 text-center">
              Available on iOS and Android — Free AAC App Trial
            </h3>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              {/* Official App Store Download Button */}
              <button
                onClick={() => {
                  analytics.trackInteraction("Hero App Store Click", {
                    location: "hero_section",
                    destination: "app_store",
                  });
                  // Open Matalk AI App Store link
                  window.open(
                    "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Matalk AI on the App Store"
              >
                <img
                  src={appStoreButton}
                  alt="Download on the App Store"
                  width={180}
                  height={54}
                  decoding="async"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>

              {/* Google Play Store Download Button */}
              <button
                onClick={() => {
                  analytics.trackInteraction("Hero Google Play Click", {
                    location: "hero_section",
                    destination: "google_play",
                  });
                  // Open Matalk AI Google Play Store link
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Matalk AI on Google Play"
              >
                <img
                  src="/images/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={180}
                  height={54}
                  decoding="async"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Robot Dog - Bottom Left Corner on Section Border */}
      <div className="sm:hidden absolute -bottom-3 left-4 z-30">
        <picture>
          <source srcSet={runningRobotDogWebp} type="image/webp" />
          <img
            src={runningRobotDogPng}
            alt="Matalk AI companion running on border"
            width={HERO_MASCOT_WIDTH}
            height={HERO_MASCOT_HEIGHT}
            decoding="async"
            fetchPriority="high"
            loading="eager"
            className="w-20 h-20 object-contain drop-shadow-lg opacity-85"
          />
        </picture>
      </div>
    </section>
  );
}
