import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection({ onJoinWaitlist }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Be Part of the Future of Communication
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join us in revolutionizing how people communicate. Together, we can make
          communication more accessible, natural, and empowering for everyone.
        </p>

        <Button
          onClick={onJoinWaitlist}
          className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:scale-[1.02] transition-all duration-200"
        >
          Join Our Waiting List
        </Button>
      </motion.div>
    </section>
  );
}