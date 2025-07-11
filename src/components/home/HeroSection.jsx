
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection({ onJoinWaitlist }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-blue-100/50" />
      
      {/* Floating shapes */}
      <motion.div
        className="absolute w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
        animate={{
          x: [50, -50, 50],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-indigo-200/30 rounded-full blur-3xl right-20 bottom-40"
        animate={{
          x: [-20, 20, -20],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-relaxed">
            The Future of Communication is Coming Soon
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-12"
        >
          Verbali is pioneering the next generation of AI-powered Augmentative and Alternative Communication (AAC) tools,
          <br className="hidden md:block" />
          making communication more natural and accessible than ever before.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            onClick={onJoinWaitlist}
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:scale-[1.02] transition-all duration-200"
          >
            Join Our Waiting List
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
