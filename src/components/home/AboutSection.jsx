import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Sprout, Rocket } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-[600px]">
      {/* Background gradients and dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-100/40 to-blue-100/40 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            top: '10%',
            left: '20%',
          }}
        />

        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-100/40 to-purple-100/40 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            bottom: '10%',
            right: '20%',
          }}
        />

        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(147, 51, 234, 0.05) 2px, transparent 0)',
          backgroundSize: '40px 40px' 
        }} />
      </div>
      
      {/* Chat bubbles that are positioned on the sides to avoid content overlap */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side bubbles */}
        <motion.div
          className="absolute left-[5%] sm:left-[10%] top-[20%] w-16 sm:w-28 md:w-32 h-14 sm:h-20 md:h-24 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-purple-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute -bottom-3 left-6 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-purple-200 rotate-45 transform origin-center" />
        </motion.div>

        <motion.div
          className="absolute left-[3%] sm:left-[8%] bottom-[25%] w-14 sm:w-24 md:w-28 h-12 sm:h-18 md:h-20 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-indigo-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="absolute -bottom-3 left-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-indigo-200 rotate-45 transform origin-center" />
        </motion.div>

        {/* Right side bubbles */}
        <motion.div
          className="absolute right-[5%] sm:right-[10%] top-[25%] w-16 sm:w-28 md:w-36 h-14 sm:h-20 md:h-24 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="absolute -bottom-3 right-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-blue-200 rotate-45 transform origin-center" />
        </motion.div>

        <motion.div
          className="absolute right-[3%] sm:right-[8%] bottom-[35%] w-14 sm:w-24 md:w-28 h-12 sm:h-18 md:h-20 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-purple-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <div className="absolute -bottom-3 right-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-purple-200 rotate-45 transform origin-center" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Reimagining Communication
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At Verbali, we believe that everyone deserves a voice. We're leveraging 
            cutting-edge AI technology to create more intuitive, responsive, and 
            natural communication tools for those who need them most.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-16 -bottom-16 w-32 h-32 bg-purple-200/50 rounded-full blur-lg"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-purple-700" />
                  <h3 className="font-semibold text-lg text-purple-700">Intuitive</h3>
                </div>
                <p className="text-gray-600">Designed to feel natural—adapting effortlessly to how each person communicates</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-16 -bottom-16 w-32 h-32 bg-blue-200/50 rounded-full blur-lg"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Sprout className="w-6 h-6 text-blue-700" />
                  <h3 className="font-semibold text-lg text-blue-700">Adaptive</h3>
                </div>
                <p className="text-gray-600">AI-driven technology that delivers a personalized experience tailored to each user's unique needs</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-indigo-50/80 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-16 -bottom-16 w-32 h-32 bg-indigo-200/50 rounded-full blur-lg"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Rocket className="w-6 h-6 text-indigo-700" />
                  <h3 className="font-semibold text-lg text-indigo-700">Empowering</h3>
                </div>
                <p className="text-gray-600">Giving everyone the power to confidently express themselves and engage meaningfully</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}