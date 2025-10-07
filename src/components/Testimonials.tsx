import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, ThumbsUp, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Testimonial } from "./testimonials-types";
import testimonialsData from "./testimonials-data.json";
const testimonialsInspiration = "/images/abc.png";

export function Testimonials() {
  const [displayTestimonials, setDisplayTestimonials] = useState<Testimonial[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load testimonials from JSON data
    const loadTestimonials = () => {
      const displayed = testimonialsData.filter(
        (t: Testimonial) => t.displayed
      );
      setDisplayTestimonials(displayed);
      setIsLoading(false);
    };

    // Initial load
    loadTestimonials();
  }, []);

  // Navigation functions
  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === displayTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-[#f7f5ff] relative overflow-hidden">
        {/* Floating Testimonial Watermarks */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Thumbs Up Icons */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-16 left-12 opacity-20"
          >
            <ThumbsUp className="w-16 h-16 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [15, -15, 15],
              rotate: [3, -3, 3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-32 right-16 opacity-15"
          >
            <ThumbsUp className="w-12 h-12 text-indigo-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [-10, 25, -10],
              rotate: [-2, 4, -2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 left-20 opacity-25"
          >
            <ThumbsUp className="w-14 h-14 text-purple-300" />
          </motion.div>

          {/* Floating Stars */}
          <motion.div
            animate={{
              y: [-25, 15, -25],
              rotate: [0, 360, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-24 left-1/3 opacity-20"
          >
            <Star className="w-10 h-10 text-purple-400 fill-purple-200" />
          </motion.div>

          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -360, 0],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-40 right-1/4 opacity-25"
          >
            <Star className="w-8 h-8 text-indigo-300 fill-indigo-100" />
          </motion.div>

          <motion.div
            animate={{
              y: [-15, 30, -15],
              rotate: [0, 180, 0],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute bottom-32 right-12 opacity-20"
          >
            <Star className="w-12 h-12 text-purple-500 fill-purple-300" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -25, 10],
              rotate: [0, 270, 0],
              scale: [1.1, 0.8, 1.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
            className="absolute bottom-16 left-1/2 opacity-15"
          >
            <Star className="w-6 h-6 text-blue-400 fill-blue-200" />
          </motion.div>

          {/* Floating Quote Icons */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [-8, 8, -8],
              scale: [0.8, 1.0, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-12 right-1/3 opacity-15"
          >
            <Quote className="w-16 h-16 text-purple-300" />
          </motion.div>

          <motion.div
            animate={{
              y: [25, -15, 25],
              rotate: [5, -10, 5],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-24 left-1/4 opacity-20"
          >
            <Quote className="w-12 h-12 text-indigo-400" />
          </motion.div>

          {/* Central Inspiration Element */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              scale: [0.9, 1.1, 0.9],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src={testimonialsInspiration}
              alt="Testimonials inspiration"
              className="w-32 h-32 object-contain opacity-10"
            />
          </motion.div>

          {/* Additional Scattered Elements */}
          <motion.div
            animate={{
              y: [-12, 18, -12],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-20 left-2/3 opacity-15"
          >
            <Star className="w-7 h-7 text-purple-400 fill-purple-200" />
          </motion.div>

          <motion.div
            animate={{
              y: [18, -12, 18],
              x: [3, -3, 3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3.5,
            }}
            className="absolute bottom-40 right-1/3 opacity-20"
          >
            <ThumbsUp className="w-10 h-10 text-indigo-300" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <h2 className="h2 mb-6 text-slate-900">What People Are Saying</h2>
            <p className="lead text-slate-600 max-w-2xl mx-auto mb-8">
              See what our users have to say about their experience with Ma-Talk
              AI.
            </p>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No testimonials state
  if (displayTestimonials.length === 0) {
    return (
      <section className="py-20 lg:py-28 bg-[#f7f5ff] relative overflow-hidden">
        {/* Floating Testimonial Watermarks */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Thumbs Up Icons */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-16 left-12 opacity-20"
          >
            <ThumbsUp className="w-16 h-16 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [15, -15, 15],
              rotate: [3, -3, 3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-32 right-16 opacity-15"
          >
            <ThumbsUp className="w-12 h-12 text-indigo-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [-10, 25, -10],
              rotate: [-2, 4, -2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 left-20 opacity-25"
          >
            <ThumbsUp className="w-14 h-14 text-purple-300" />
          </motion.div>

          {/* Floating Stars */}
          <motion.div
            animate={{
              y: [-25, 15, -25],
              rotate: [0, 360, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-24 left-1/3 opacity-20"
          >
            <Star className="w-10 h-10 text-purple-400 fill-purple-200" />
          </motion.div>

          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -360, 0],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-40 right-1/4 opacity-25"
          >
            <Star className="w-8 h-8 text-indigo-300 fill-indigo-100" />
          </motion.div>

          <motion.div
            animate={{
              y: [-15, 30, -15],
              rotate: [0, 180, 0],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute bottom-32 right-12 opacity-20"
          >
            <Star className="w-12 h-12 text-purple-500 fill-purple-300" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -25, 10],
              rotate: [0, 270, 0],
              scale: [1.1, 0.8, 1.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
            className="absolute bottom-16 left-1/2 opacity-15"
          >
            <Star className="w-6 h-6 text-blue-400 fill-blue-200" />
          </motion.div>

          {/* Floating Quote Icons */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [-8, 8, -8],
              scale: [0.8, 1.0, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-12 right-1/3 opacity-15"
          >
            <Quote className="w-16 h-16 text-purple-300" />
          </motion.div>

          <motion.div
            animate={{
              y: [25, -15, 25],
              rotate: [5, -10, 5],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-24 left-1/4 opacity-20"
          >
            <Quote className="w-12 h-12 text-indigo-400" />
          </motion.div>

          {/* Central Inspiration Element */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              scale: [0.9, 1.1, 0.9],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src={testimonialsInspiration}
              alt="Testimonials inspiration"
              className="w-32 h-32 object-contain opacity-10"
            />
          </motion.div>

          {/* Additional Scattered Elements */}
          <motion.div
            animate={{
              y: [-12, 18, -12],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-20 left-2/3 opacity-15"
          >
            <Star className="w-7 h-7 text-purple-400 fill-purple-200" />
          </motion.div>

          <motion.div
            animate={{
              y: [18, -12, 18],
              x: [3, -3, 3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3.5,
            }}
            className="absolute bottom-40 right-1/3 opacity-20"
          >
            <ThumbsUp className="w-10 h-10 text-indigo-300" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <h2 className="h2 mb-6 text-slate-900">What People Are Saying</h2>
            <p className="lead text-slate-600 max-w-2xl mx-auto mb-8">
              See what our users have to say about their experience with Ma-Talk
              AI.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
              <p className="text-slate-500">
                No testimonials available at the moment. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = displayTestimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#f7f5ff] relative overflow-hidden">
      {/* Floating Testimonial Watermarks */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Thumbs Up Icons */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 4 : 0,
          }}
          className="absolute top-16 left-12 opacity-20"
        >
          <ThumbsUp className="w-16 h-16 text-purple-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [15, -15, 15],
            rotate: [3, -3, 3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 6 : 1,
          }}
          className="absolute top-32 right-16 opacity-15"
        >
          <ThumbsUp className="w-12 h-12 text-indigo-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [-10, 25, -10],
            rotate: [-2, 4, -2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 8 : 2,
          }}
          className="absolute bottom-20 left-20 opacity-25"
        >
          <ThumbsUp className="w-14 h-14 text-purple-300" />
        </motion.div>

        {/* Floating Stars */}
        <motion.div
          animate={{
            y: [-25, 15, -25],
            rotate: [0, 360, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 2 : 0,
          }}
          className="absolute top-24 left-1/3 opacity-20"
        >
          <Star className="w-10 h-10 text-purple-400 fill-purple-200" />
        </motion.div>

        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -360, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640
                ? 10
                : 1.5,
          }}
          className="absolute top-40 right-1/4 opacity-25"
        >
          <Star className="w-8 h-8 text-indigo-300 fill-indigo-100" />
        </motion.div>

        <motion.div
          animate={{
            y: [-15, 30, -15],
            rotate: [0, 180, 0],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 3,
          }}
          className="absolute bottom-32 right-12 opacity-20"
        >
          <Star className="w-12 h-12 text-purple-500 fill-purple-300" />
        </motion.div>

        <motion.div
          animate={{
            y: [10, -25, 10],
            rotate: [0, 270, 0],
            scale: [1.1, 0.8, 1.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640
                ? 14
                : 2.5,
          }}
          className="absolute bottom-16 left-1/2 opacity-15"
        >
          <Star className="w-6 h-6 text-blue-400 fill-blue-200" />
        </motion.div>

        {/* Floating Quote Icons */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [-8, 8, -8],
            scale: [0.8, 1.0, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640
                ? 16
                : 0.5,
          }}
          className="absolute top-12 right-1/3 opacity-15"
        >
          <Quote className="w-16 h-16 text-purple-300" />
        </motion.div>

        <motion.div
          animate={{
            y: [25, -15, 25],
            rotate: [5, -10, 5],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 18 : 2,
          }}
          className="absolute bottom-24 left-1/4 opacity-20"
        >
          <Quote className="w-12 h-12 text-indigo-400" />
        </motion.div>

        {/* Central Inspiration Element */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            scale: [0.9, 1.1, 0.9],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 5 : 0,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={testimonialsInspiration}
            alt="Testimonials inspiration"
            className="w-32 h-32 object-contain opacity-10"
          />
        </motion.div>

        {/* Additional Scattered Elements */}
        <motion.div
          animate={{
            y: [-12, 18, -12],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 1,
          }}
          className="absolute top-20 left-2/3 opacity-15"
        >
          <Star className="w-7 h-7 text-purple-400 fill-purple-200" />
        </motion.div>

        <motion.div
          animate={{
            y: [18, -12, 18],
            x: [3, -3, 3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              typeof window !== "undefined" && window.innerWidth < 640
                ? 22
                : 3.5,
          }}
          className="absolute bottom-40 right-1/3 opacity-20"
        >
          <ThumbsUp className="w-10 h-10 text-indigo-300" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h2 mb-6 text-slate-900"
          >
            What People Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lead text-slate-600 max-w-2xl mx-auto"
          >
            See what our users have to say about their experience with Ma-Talk
            AI.
          </motion.p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Large decorative quote mark */}
          <div className="absolute -left-8 top-0 text-purple-200/60 text-8xl font-serif leading-none pointer-events-none select-none hidden lg:block">
            "
          </div>

          {/* Navigation arrows */}
          {displayTestimonials.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-purple-100 rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 hover:scale-105"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-purple-600" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-purple-100 rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 hover:scale-105"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-purple-600" />
              </button>
            </>
          )}

          {/* Testimonial card */}
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-12"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl border border-white/20 relative overflow-hidden">
              {/* Featured badge */}
              {currentTestimonial.featured && (
                <div className="absolute top-6 left-6">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Featured
                  </div>
                </div>
              )}

              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-purple-600" />
              </div>

              {/* Author info at the top */}
              <div className="flex flex-col items-center text-center mb-6">
                <div>
                  <div className="font-semibold text-slate-900 mb-1 text-lg">
                    {currentTestimonial.author}
                    {currentTestimonial.credentials && (
                      <span className="text-purple-600 ml-2 font-normal">
                        {currentTestimonial.credentials}
                      </span>
                    )}
                  </div>
                  <div className="text-slate-600 mb-1">
                    {currentTestimonial.role}
                  </div>
                  {currentTestimonial.company && (
                    <div className="text-sm text-purple-600 font-medium">
                      {currentTestimonial.company}
                    </div>
                  )}
                  {currentTestimonial.website && (
                    <div className="text-xs text-slate-500 mt-1">
                      <a
                        href={`https://${currentTestimonial.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 transition-colors duration-200 underline"
                      >
                        {currentTestimonial.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Quote text */}
              <div className="text-center">
                <p className="text-slate-700 leading-relaxed text-base lg:text-lg italic font-medium">
                  "{currentTestimonial.quote}"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dot indicators */}
          {displayTestimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-purple-600 scale-125"
                      : "bg-purple-200 hover:bg-purple-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Join the Matalk AI Community
            </h3>
            <p className="text-slate-600 mb-6">
              Experience the future of AAC communication and see why families
              and professionals are choosing Matalk AI.
            </p>
            <div className="text-slate-700 font-medium text-sm">
              Download Matalk AI now
            </div>

            {/* Download Badges */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <button
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Matalk AI on the App Store"
              >
                <img
                  src="/images/black.svg"
                  alt="Download on the App Store"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
              <button
                onClick={() => {
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
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
