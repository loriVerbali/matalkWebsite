"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Image as ImageIcon, Mail } from "lucide-react";
import tasteOfMatalkData from "./TasteOfMatalk.json";

interface Answer {
  word: string;
  image: string;
}

interface QuestionData {
  question: string;
  answers: Answer[];
}

export function TasteOfMatalkAI() {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData | null>(
    null
  );
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleQuestionSelect = (questionData: QuestionData) => {
    setSelectedQuestion(questionData);
    setShowEmailForm(false);
    setImagesLoaded(0);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleImageClick = (word: string) => {
    // Speak the word
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);

    // Show email form
    setShowEmailForm(true);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(
        "https://matalkwebsitebe-production.up.railway.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            source: "website",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! We'll be in touch soon.",
        });
        setEmail("");
        setTimeout(() => {
          setShowEmailForm(false);
          setSelectedQuestion(null);
          setSubmitStatus({ type: null, message: "" });
        }, 3000);
      } else {
        let errorMessage = "Something went wrong. Please try again.";

        if (response.status === 409) {
          errorMessage = "This email is already registered.";
        } else if (response.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (response.status === 400) {
          errorMessage = data.message || "Please enter a valid email address.";
        }

        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
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
            Experience the power of AI-generated visual responses. Tap a
            question and watch as Matalk AI shows 5 unique images with
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
              ⚠️ Demo only: Tap on any image to hear the word spoken aloud.
            </p>
          </motion.div>
        </div>

        {/* Question Cards */}
        {!selectedQuestion && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasteOfMatalkData.map((questionData, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleQuestionSelect(questionData)}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {questionData.question}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Tap to see 5 AI-generated responses
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results Display */}
        {selectedQuestion && !showEmailForm && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <button
                onClick={() => {
                  setSelectedQuestion(null);
                  setSubmitStatus({ type: null, message: "" });
                }}
                className="text-purple-600 hover:text-purple-700 font-medium mb-4"
              >
                ← Back to questions
              </button>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {selectedQuestion.question}
              </h3>
              <p className="text-slate-600">
                Tap on any image to hear the word spoken
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {selectedQuestion.answers.map((answer, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleImageClick(answer.word)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={answer.image}
                      alt={`AI generated response ${index + 1}`}
                      className="w-full h-full object-cover"
                      onLoad={() => {
                        setImagesLoaded((prev) => prev + 1);
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EImage not available%3C/text%3E%3C/svg%3E";
                        setImagesLoaded((prev) => prev + 1);
                      }}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-slate-800 font-medium text-sm">
                      {answer.word}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Email Form */}
        {showEmailForm && (
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Want to learn more?
                </h3>
                <p className="text-slate-600">
                  Contact us to discover how Matalk AI can help with
                  communication.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200"
                    required
                  />
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <motion.div
                    className={`p-3 rounded-lg text-sm font-medium ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Contact Us</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-center mb-4">
                  <p className="text-slate-600 font-medium">
                    OR Download the app
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <a
                    href="https://apps.apple.com/us/app/ma-talk-ai/id6747360381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-transform duration-200 hover:scale-105"
                  >
                    <img
                      src="/images/black.svg"
                      alt="Download on the App Store"
                      className="h-14 w-auto transition-all duration-200"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!selectedQuestion && !showEmailForm && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              Select a question above to see AI-generated visual responses
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
