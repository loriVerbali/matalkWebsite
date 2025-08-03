import { motion } from "framer-motion";
import { Heart } from "lucide-react";
// Placeholder image - replace with actual image when available
const sleepingRobotDog = "/images/verbiSleeping.png";

export function Struggle() {
  return (
    <section className="pt-16 pb-20 sm:mobile-section-padding lg:py-28 bg-lavender-50 relative overflow-hidden mobile-no-overflow">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/30"></div>

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="dot-pattern w-full h-full"></div>
      </div>

      <div className="max-w-4xl mx-auto mobile-container relative">
        <div className="text-center">
          {/* Heart icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-200/80 to-pink-200/80 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </motion.div>

          {/* Section title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h2 mb-8 sm:mb-12 text-slate-900"
          >
            We've Felt the Struggle
          </motion.h2>

          {/* First hero subtitle */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h3 mb-6 sm:mb-8 text-slate-800 max-w-3xl mx-auto"
          >
            AAC should be intuitive, fast, and empower independence.
          </motion.h3>

          {/* Personal story card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card max-w-3xl mx-auto relative mb-8 sm:mb-12"
          >
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 mb-4 sm:mb-6 text-left">
              I'm Shay, dad to a non-verbal son. My family spent years wrestling
              with endless customization and slow, awkward chats. It was
              exhausting. We knew there had to be a better way - so I started
              Verbali to reinvent how AAC feels for kids and parents.
            </p>

            {/* Signature */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <p className="font-semibold text-slate-900">Shay Cohen</p>
                <p className="text-sm text-slate-600">
                  Co-founder & CEO, Verbali
                </p>
              </div>
            </div>

            {/* Desktop Robot Dog - Hidden on mobile */}
            <div className="hidden sm:block absolute -bottom-3 sm:-bottom-4 right-6 sm:right-8 z-10">
              <img
                src={sleepingRobotDog}
                alt="Ma-Talk AI sleeping companion"
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Second hero subtitle - Extra spacing and bottom padding on mobile for robot dog space */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h3 text-gradient max-w-3xl mx-auto mt-16 sm:mt-24 pb-16 sm:pb-0"
          >
            AAC brings hope - we're here to make that hope real.
          </motion.h3>
        </div>
      </div>

      {/* Mobile Robot Dog - Bottom Right Corner */}
      <div className="sm:hidden absolute -bottom-2 right-4 z-30">
        <motion.img
          src={sleepingRobotDog}
          alt="Ma-Talk AI companion"
          className="w-16 h-16 object-contain drop-shadow-lg opacity-85"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 0.85, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </div>

      {/* Enhanced decorative elements - Adjusted positioning to avoid mobile robot dog */}
      <div className="absolute top-20 sm:top-16 left-6 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-purple-200/60 rounded-full opacity-40 blur-xl"></div>
      <div className="absolute bottom-20 sm:bottom-16 left-6 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-200/50 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-pink-200/40 rounded-full opacity-25 blur-lg"></div>
    </section>
  );
}
