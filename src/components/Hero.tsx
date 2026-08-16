import { motion } from "framer-motion";
import { PlanCards, ScheduleDemoCTA } from "./PlanCards";

const runningRobotDogWebp = "/images/chasingBall.webp";
const runningRobotDogPng = "/images/chasingBall.png";

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
            {/* Card Header — Patent Pending */}
            <div className="flex flex-col items-center gap-3 max-w-2xl mx-auto text-center">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-xs sm:text-sm font-bold tracking-[0.08em] uppercase px-5 sm:px-6 py-2.5 rounded-full whitespace-nowrap shadow-lg shadow-violet-500/30">
                Patent Pending
              </span>
              <h3 className="h3 text-gradient">
                Two apps. Pick the one that fits.
              </h3>
              <p className="text-base sm:text-[17px] leading-relaxed text-slate-600">
                You'll find both in the App Store. They run the same AI and the
                same adaptive symbol grid — one is a subscription, the other you
                buy once.
              </p>
            </div>

            {/* The two apps */}
            <div className="mt-10">
              <PlanCards location="hero_section" />
            </div>

            {/* Schools & clinics — schedule a demo */}
            <div className="mt-8">
              <ScheduleDemoCTA location="hero_section" />
            </div>

            {/* Partners Logos Section */}
            <div className="mt-12 pt-8 border-t border-slate-200/50">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                In Partnership With
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
                <a href="https://tech.cornell.edu/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity transform hover:scale-105 transition-all duration-300">
                  <img src="/images/partners/cornellTech.png" alt="Cornell Tech" className="h-32 sm:h-40 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                </a>
                <a href="https://www.ablenetinc.com/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity transform hover:scale-105 transition-all duration-300">
                  <img src="/images/partners/ablenet.png" alt="Ablenet" className="h-5 sm:h-6 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                </a>
                <a href="https://www.davoice.io" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity transform hover:scale-105 transition-all duration-300">
                  <img src="/images/partners/davoice.jpeg" alt="DaVoice" className="h-10 sm:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all rounded" />
                </a>
              </div>
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
