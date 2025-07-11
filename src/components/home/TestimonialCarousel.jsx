import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials.length) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          What People Are Saying
        </h2>

        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="rounded-full w-10 h-10 bg-white shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-center relative">
                  <Quote className="w-12 h-12 text-purple-200 absolute top-4 left-4" />
                  
                  <div className="mb-8">
                    {testimonials[currentIndex].avatar_url ? (
                      <img
                        src={testimonials[currentIndex].avatar_url}
                        alt={testimonials[currentIndex].author}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-r from-purple-200 to-blue-200 flex items-center justify-center text-2xl font-bold text-white">
                        {testimonials[currentIndex].author[0]}
                      </div>
                    )}
                    <h3 className="font-semibold text-xl text-gray-800">
                      {testimonials[currentIndex].author}
                    </h3>
                    <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                  </div>

                  <blockquote className="text-xl text-gray-600 italic leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="rounded-full w-10 h-10 bg-white shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-500 w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}