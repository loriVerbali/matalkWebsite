import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/components/utils";

export default function BlogSection() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);

    // Static articles data
    const staticArticles = [
      {
        id: "1",
        slug: "ai-natural-conversation",
        title: "Why Natural Conversation Matters—for Everyone Involved",
        excerpt:
          "When we think of communication, we often focus on the words. But the experience of the conversation—how it flows, feels, and unfolds—is just as important as the message itself.",
        cover_image: {
          url: "/assets/story.jpeg",
          alt: "Natural Conversation",
        },
      },
      {
        id: "2",
        slug: "the-quiet-genius",
        title: "The Quiet Genius: How AI is Quietly Rewriting Human Potential",
        excerpt:
          "What happens when machines begin to not just understand our words—but our needs, emotions, and intentions?",
        cover_image: {
          url: "/assets/article.jpeg",
          alt: "The Quiet Genius",
        },
      },
    ];

    setTimeout(() => {
      setArticles(staticArticles);
      setIsLoading(false);
    }, 500);
  };

  // Wait for loading or show fallback if no articles
  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Latest Insights
            </h2>
            <p className="text-lg text-gray-600">
              Exploring the future of communication technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no articles, don't render the section
  if (articles.length === 0) {
    return null;
  }

  // Determine grid layout based on number of articles
  const getGridClass = () => {
    switch (articles.length) {
      case 1:
        return "md:grid-cols-1 max-w-2xl mx-auto";
      case 2:
        return "md:grid-cols-2";
      default:
        return "md:grid-cols-3";
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradients and dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-100/40 to-purple-100/40 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "10%",
            right: "20%",
          }}
        />

        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-100/40 to-indigo-100/40 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            bottom: "10%",
            left: "20%",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, rgba(147, 51, 234, 0.05) 2px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Repositioned chat bubbles that won't overlap content */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side bubbles - adjusted positions */}
        <motion.div
          className="absolute left-[5%] sm:left-[8%] top-[35%] w-16 sm:w-28 md:w-32 h-14 sm:h-20 md:h-24 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute -bottom-3 left-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-blue-200 rotate-45 transform origin-center" />
        </motion.div>

        <motion.div
          className="absolute left-[3%] sm:left-[6%] bottom-[20%] w-14 sm:w-24 md:w-28 h-12 sm:h-18 md:h-20 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-indigo-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="absolute -bottom-3 left-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-indigo-200 rotate-45 transform origin-center" />
        </motion.div>

        {/* Right side bubbles - adjusted positions */}
        <motion.div
          className="absolute right-[5%] sm:right-[10%] top-[45%] w-16 sm:w-28 md:w-36 h-14 sm:h-20 md:h-24 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-purple-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute -bottom-3 right-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-purple-200 rotate-45 transform origin-center" />
        </motion.div>

        <motion.div
          className="absolute right-[3%] sm:right-[8%] bottom-[25%] w-14 sm:w-24 md:w-28 h-12 sm:h-18 md:h-20 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <div className="absolute -bottom-3 right-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/70 border-2 border-blue-200 rotate-45 transform origin-center" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600">
            Exploring the future of communication technology
          </p>
        </div>

        <div className={`grid ${getGridClass()} gap-8`}>
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={createPageUrl("BlogPost", { slug: article.slug || article.id })}
                className="block h-full"
              >
                <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.02] h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.cover_image?.url || article.image_url} // Support both new and old format
                      alt={article.cover_image?.alt || article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-purple-600 font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
