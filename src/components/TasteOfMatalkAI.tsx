"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Image as ImageIcon } from "lucide-react";

interface PollinationResponse {
  images: string[];
  words: string[];
}

export function TasteOfMatalkAI() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PollinationResponse | null>(null);
  const [error, setError] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      // First, get the text response from Pollinations API
      const systemPrompt =
        "You are an AI specialized in generating single-word responses for AAC communication. Always provide simple, clear, and accessible words that a young child can understand.Return 5 options for every question or statement";

      const textResponse = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(
          question.trim()
        )}&system=${encodeURIComponent(systemPrompt)}&private=true`
      );

      if (!textResponse.ok) {
        throw new Error("Failed to get text response");
      }

      const textData = await textResponse.text();
      console.log("Text API response:", textData); // Debug log

      // Parse the response to extract single words
      let words: string[] = [];

      // Handle numbered lists and other formats
      const lines = textData
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      words = lines
        .map((line) => {
          // Remove numbered prefixes like "1.", "2.", etc.
          const cleaned = line.replace(/^\d+\.\s*/, "").trim();
          return cleaned;
        })
        .filter((word) => word.length > 0)
        .filter((word) => {
          // Filter out introductory phrases and non-word responses
          const lowerWord = word.toLowerCase();
          return (
            !lowerWord.includes("here are") &&
            !lowerWord.includes("options") &&
            !lowerWord.includes("sure") &&
            !lowerWord.includes("simple words") &&
            word.length > 1
          ); // Ensure it's not just a single character
        });

      // If still no words, try comma splitting as fallback
      if (words.length === 0) {
        words = textData
          .split(/[,;|]/)
          .map((word) => word.trim())
          .filter((word) => word.length > 0);
      }

      console.log("Parsed words:", words); // Debug log

      // Only use what the API returns, no fallbacks
      if (words.length === 0) {
        throw new Error("No words returned from API");
      }

      console.log("Final words:", words); // Debug log

      // Generate 5 images using the Pollinations image API with specific prompt format
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const images = words.map((word) => {
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const prompt = `Create a simple, child-friendly illustration representing the concept "${word}". The image should be instantly understandable to a 6-year-old child. No text, no words, no letters. No animals unless the word specifically refers to an animal. Use a clean, minimal background.`;

        return `https://image.pollinations.ai/prompt/${encodeURIComponent(
          prompt
        )}?width=512&height=512&private=true&model=flux&safe=true&enhance=true`;
      });

      setResults({
        images,
        words,
      });
      setImagesLoaded(0); // Reset image loading counter
    } catch (err) {
      setError("Failed to generate responses. Please try again.");
      console.error("Error generating responses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 left-12"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0, -3, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-24 h-20 opacity-15" viewBox="0 0 96 80" fill="none">
            <path
              d="M8 8C8 3.582 11.582 0 16 0H80C84.418 0 88 3.582 88 8V48C88 52.418 84.418 56 80 56H24L8 80V8Z"
              fill="url(#bubbleGrad1)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              A Taste of Matalk AI
            </h2>
          </motion.div>

          <motion.p
            className="text-xl text-slate-700 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience the power of AI-generated visual responses. Ask a
            question and watch as Matalk AI creates 5 unique images with
            associated words.{" "}
            <span className="font-semibold text-purple-600 italic">
              This is just a taste - Matalk-AI can do much more!
            </span>
          </motion.p>

          <motion.div
            className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm text-amber-800 text-center">
              ⚠️ Demo only: Questions are sent to a public API. Do not share
              private information. Nothing is saved.
            </p>
          </motion.div>
        </div>

        {/* Question Input Form */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question like 'How was school?' or 'What's your favorite food?'"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-base border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>

          {error && (
            <motion.div
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Results Display */}
        {results && imagesLoaded === results.images.length && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {results.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    // Speak the word
                    const utterance = new SpeechSynthesisUtterance(
                      results.words[index]
                    );
                    utterance.rate = 0.8; // Slightly slower for clarity
                    utterance.pitch = 1.1; // Slightly higher pitch for child-friendly voice
                    speechSynthesis.speak(utterance);

                    // Reset the component after a short delay
                    setTimeout(() => {
                      setQuestion("");
                      setResults(null);
                      setError("");
                    }, 1000);
                  }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image}
                      alt={`AI generated response ${index + 1}`}
                      className="w-full h-full object-cover"
                      onLoad={() => {
                        setImagesLoaded((prev) => prev + 1);
                      }}
                      onError={(e) => {
                        // Fallback for failed image loads
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EImage not available%3C/text%3E%3C/svg%3E";
                        setImagesLoaded((prev) => prev + 1); // Count error as loaded
                      }}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-slate-800 font-medium text-sm">
                      {results.words[index]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-slate-600 italic">
                Each image represents a different aspect of your question, just
                like how Matalk AI helps express complex thoughts through visual
                communication.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center justify-center mb-6">
              <img
                src="/images/output.gif"
                alt="Loading indicator"
                className="w-24 h-24 mb-4"
              />
              <span className="text-lg text-slate-700">
                Generating your AI responses...
              </span>
            </div>
            <p className="text-slate-500">
              Getting text responses and creating 5 unique visual
              interpretations
            </p>
          </motion.div>
        )}

        {/* Empty State */}
        {!results && !isLoading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              Ask a question above to see AI-generated visual responses
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
