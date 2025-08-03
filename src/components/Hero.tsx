// App Store button
const appStoreButton = "/images/black.svg";
const runningRobotDog = "/images/chasingBall.png";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="py-24 sm:mobile-section-padding bg-lavender-50 relative overflow-hidden mobile-no-overflow">
      {/* Static Robot Dog on Section Border - Hidden on mobile for cleaner design */}
      <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-4 sm:left-6 lg:left-8 z-30 mobile-hide">
        <motion.img
          src={runningRobotDog}
          alt="Ma-Talk AI companion running"
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain drop-shadow-2xl hover:scale-110 transition-all duration-300 opacity-95 hover:opacity-100"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 0.95 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto mobile-container">
        <div className="text-center max-w-4xl mx-auto mobile-text-center">
          {/* Headline */}
          <motion.h1
            className="h1 text-gradient mb-8 sm:mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            AI Meets AAC. Speak Naturally
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="lead text-slate-700 mb-8 sm:mb-8 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Verbali is pioneering the next generation of AI-powered Augmentative
            and Alternative Communication (AAC) tools, making communication more
            natural and accessible than ever before.
          </motion.p>

          {/* Catchphrase */}
          <motion.p
            className="text-lg sm:text-xl italic text-slate-600 mb-10 sm:mb-10 font-medium px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "Because the most meaningful conversation is a natural one"
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 justify-center mb-6 sm:mb-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Official App Store Download Button */}
            <button
              onClick={() => {
                // Open Ma-Talk AI App Store link
                window.open(
                  "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                  "_blank"
                );
              }}
              className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
              aria-label="Download Ma-Talk AI on the App Store"
            >
              <img
                src={appStoreButton}
                alt="Download on the App Store"
                className="h-12 sm:h-14 w-auto transition-all duration-200"
              />
            </button>
          </motion.div>

          {/* Launch Date Subtitle */}
          <motion.p
            className="caption text-slate-500 mt-6 sm:mt-6 px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Launching in 2025 • Early access • Priority support
          </motion.p>
        </div>
      </div>

      {/* Mobile Robot Dog - Bottom Left Corner on Section Border */}
      <div className="sm:hidden absolute -bottom-3 left-4 z-30">
        <img
          src={runningRobotDog}
          alt="Ma-Talk AI companion running on border"
          className="w-20 h-20 object-contain drop-shadow-lg opacity-85"
        />
      </div>
    </section>
  );
}
