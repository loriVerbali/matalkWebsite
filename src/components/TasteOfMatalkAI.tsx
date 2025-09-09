import { useState } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import maTalkLogo from "/images/MatalkLogoWeb.png";
import tasteOfMatalkData from "./TasteOfMatalk.json";
import analytics from "../utils/analytics";

interface PlaygroundProps {
  onBack: () => void;
}

interface Question {
  id: string;
  text: string;
  category: string;
}

interface AnswerOption {
  id: string;
  label: string;
  imageUrl?: string;
  isMore?: boolean;
}

interface TasteOfMatalkItem {
  question: string;
  answers: Array<{
    answer: string;
    image_details: {
      file_id: string;
      file_name: string;
      image_link: string;
    };
  }>;
}

// Transform the JSON data into the format we need
const questions: Question[] = tasteOfMatalkData.map(
  (item: TasteOfMatalkItem, index) => ({
    id: `question-${index}`,
    text: item.question,
    category: getCategoryFromQuestion(item.question),
  })
);

const answerOptions: Record<string, AnswerOption[]> = {};

tasteOfMatalkData.forEach((item: TasteOfMatalkItem, questionIndex) => {
  const questionId = `question-${questionIndex}`;
  answerOptions[questionId] = item.answers.map((answer, answerIndex) => ({
    id: `answer-${questionIndex}-${answerIndex}`,
    label: answer.answer,
    imageUrl: `/tabletImages/${answer.image_details.file_name}.png`,
  }));

  // Add "Get More Answers" option
  answerOptions[questionId].push({
    id: `more-${questionIndex}`,
    label: "Get More Answers",
    imageUrl: "/images/cantfindIt.png",
    isMore: true,
  });
});

// Helper function to categorize questions
function getCategoryFromQuestion(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (
    lowerQuestion.includes("bedtime") ||
    lowerQuestion.includes("sleep") ||
    lowerQuestion.includes("dream")
  ) {
    return "Bedtime";
  } else if (
    lowerQuestion.includes("school") ||
    lowerQuestion.includes("class")
  ) {
    return "School";
  } else if (
    lowerQuestion.includes("dentist") ||
    lowerQuestion.includes("doctor")
  ) {
    return "Health";
  } else if (
    lowerQuestion.includes("breakfast") ||
    lowerQuestion.includes("eat") ||
    lowerQuestion.includes("food")
  ) {
    return "Food";
  } else if (
    lowerQuestion.includes("movie") ||
    lowerQuestion.includes("watch")
  ) {
    return "Entertainment";
  } else if (
    lowerQuestion.includes("train") ||
    lowerQuestion.includes("station")
  ) {
    return "Travel";
  } else if (
    lowerQuestion.includes("winter") ||
    lowerQuestion.includes("snow") ||
    lowerQuestion.includes("cold")
  ) {
    return "Weather";
  } else if (
    lowerQuestion.includes("morning") ||
    lowerQuestion.includes("breakfast")
  ) {
    return "Morning";
  } else if (
    lowerQuestion.includes("art") ||
    lowerQuestion.includes("draw") ||
    lowerQuestion.includes("paint")
  ) {
    return "Art";
  } else if (lowerQuestion.includes("home") || lowerQuestion.includes("bed")) {
    return "Home";
  } else {
    return "General";
  }
}

export function TasteOfMatalkAI({ onBack }: PlaygroundProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [answerClickCount, setAnswerClickCount] = useState(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem("matalk_answer_clicks");
    return stored ? parseInt(stored, 10) : 0;
  });

  // Get unique categories for filter
  const categories = [
    "All",
    ...Array.from(new Set(questions.map((q: Question) => q.category))),
  ];

  const handleQuestionSelect = (question: Question) => {
    // Track question selection
    analytics.trackInteraction("TasteOfMatalk Question Selected", {
      question_id: question.id,
      question_text: question.text,
      question_category: question.category,
      component: "Playground",
    });

    setSelectedQuestion(question);
    setSelectedAnswer(null);
    setShowSuccess(false);
  };

  const handleAnswerSelect = (
    answerId: string,
    isMore?: boolean,
    word?: string
  ) => {
    if (isMore) {
      // Simulate "more answers" functionality
      setShowSuccess(false);
      return;
    }

    // Speak the word if provided
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }

    setSelectedAnswer(answerId);
    setShowSuccess(true);

    // Increment click count and store in localStorage
    const newCount = answerClickCount + 1;
    setAnswerClickCount(newCount);
    localStorage.setItem("matalk_answer_clicks", newCount.toString());

    // Only show email form after 2 clicks and if not already shown in this session
    const hasShownForm = sessionStorage.getItem("matalk_form_shown");
    if (newCount >= 2 && !hasShownForm) {
      setShowEmailForm(true);
      sessionStorage.setItem("matalk_form_shown", "true");
    }

    setSubmitStatus({ type: null, message: "" });

    // Auto-hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const resetPlayground = () => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setShowSuccess(false);
    setShowEmailForm(false);
    setEmail("");
    setSubmitStatus({ type: null, message: "" });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Track form submission attempt
    analytics.trackFormSubmission("TasteOfMatalk Lead Form", true, {
      email: email.trim(),
      question_id: selectedQuestion?.id,
      question_text: selectedQuestion?.text,
      question_category: selectedQuestion?.category,
      component: "Playground",
      source: "website",
    });

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const requestBody = {
        email: email.trim(),
        source: "website",
      };

      analytics.trackFormSubmission("TasteOfMatalk Lead Form", true, {
        email: email.trim(),
        component: "TasteOfMatalkAI",
        source: "website",
      });

      const response = await fetch(
        "https://matalkwebsitebe-production.up.railway.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const data = await response.json();
      console.log("Response data:", data);

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
          console.log("API Error Response:", data);
          errorMessage =
            data.message || data.error || "Please enter a valid email address.";
        }

        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      // Track network error
      analytics.trackFormSubmission("TasteOfMatalk Lead Form", false, {
        email: email.trim(),
        component: "Playground",
        source: "website",
        status: "network_error",
        error_message: "Network error",
      });

      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter questions based on selected category
  const filteredQuestions =
    selectedFilter === "All"
      ? questions
      : questions.filter(
          (question: Question) => question.category === selectedFilter
        );

  return (
    <div className="min-h-screen bg-lavender-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-white via-lavender-50 to-purple-50 border-b border-violet-600/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 text-slate-700 hover:text-violet-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Site</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12">
                <img
                  src={maTalkLogo}
                  alt="Ma-Talk AI App"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="h1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Ma-Talk AI Playground
              </h1>
            </div>
            <p className="lead text-slate-600 mb-8 max-w-2xl mx-auto">
              Try it out! Select a question below to see how{" "}
              <span className="font-bold text-violet-600">Ma-Talk AI</span>{" "}
              creates personalized, visual communication boards that help
              children express themselves naturally.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Question Selection */}
        {!selectedQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src="/images/verbiPose.png"
                  alt="Verbipose"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain"
                />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  Choose a Question
                </h2>
              </div>

              {/* Topic Filter */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {categories.map((category: string) => (
                    <button
                      key={category}
                      onClick={() => setSelectedFilter(category)}
                      className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                        selectedFilter === category
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg transform scale-105"
                          : "bg-white text-slate-600 border border-violet-600/20 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-300 shadow-sm"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <p className="text-slate-500 text-sm">
                  Showing {filteredQuestions.length} question
                  {filteredQuestions.length !== 1 ? "s" : ""}
                  {selectedFilter !== "All" && ` in ${selectedFilter}`}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question: Question, index: number) => (
                <motion.button
                  key={question.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  onClick={() => handleQuestionSelect(question)}
                  className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group border border-violet-600/10 hover:border-violet-300"
                >
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      {question.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-3 group-hover:text-violet-600 transition-colors text-slate-900 line-clamp-3 text-sm sm:text-base">
                    {question.text}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Tap to explore visual answers
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ma-Talk AI Interface */}
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={resetPlayground}
                className="flex items-center space-x-3 text-slate-600 hover:text-violet-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Choose Different Question</span>
              </button>
              <button
                onClick={() => {
                  setSelectedAnswer(null);
                  setShowSuccess(false);
                }}
                className="flex items-center space-x-3 text-slate-600 hover:text-violet-600 transition-colors group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Reset</span>
              </button>
            </div>

            {/* Email Form or Tablet Mockup */}
            <div className="grid lg:grid-cols-3 gap-8">
              {showEmailForm ? (
                <div className="lg:col-span-2 flex justify-center">
                  <div className="max-w-md w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-2xl p-8 shadow-xl border border-violet-600/10"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                          Want to learn more?
                        </h3>
                        <p className="text-slate-600">
                          Reach out to Ma-Talk AI to learn more
                        </p>
                      </div>

                      <form onSubmit={handleEmailSubmit} className="space-y-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-2"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {submitStatus.type && (
                          <div
                            className={`p-4 rounded-xl text-sm ${
                              submitStatus.type === "success"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {submitStatus.message}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </form>

                      <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm mb-4">OR</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                          <a
                            href="https://apps.apple.com/us/app/ma-talk-ai/id6747360381"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              analytics.trackInteraction(
                                "App Store Button Clicked",
                                {
                                  component: "Playground",
                                  source: "website",
                                }
                              );
                            }}
                            className="group transition-transform duration-200 hover:scale-105 inline-block"
                          >
                            <img
                              src="/images/black.svg"
                              alt="Download on the App Store"
                              className="h-12 w-auto transition-all duration-200"
                            />
                          </a>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              analytics.trackInteraction(
                                "Google Play Button Clicked",
                                {
                                  component: "Playground",
                                  source: "website",
                                }
                              );
                            }}
                            className="group transition-transform duration-200 hover:scale-105 inline-block"
                          >
                            <img
                              src="/images/Google_Play_Store_badge_EN.svg"
                              alt="Get it on Google Play"
                              className="h-12 w-auto transition-all duration-200"
                            />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-2 flex justify-center">
                  <div className="relative max-w-4xl w-full">
                    {/* Tablet Frame */}
                    <div className="bg-slate-800 rounded-[3rem] p-4 shadow-2xl">
                      <div className="bg-slate-900 rounded-[2.5rem] p-3">
                        <div
                          className="rounded-[2rem] p-6 min-h-[500px] relative overflow-hidden"
                          style={{ backgroundColor: "#FFF8E7" }}
                        >
                          {/* Status Bar */}
                          <div className="flex justify-between items-center mb-6 text-sm text-slate-600">
                            <span>2:34 PM Fri Jul 11</span>
                            <div className="flex items-center space-x-2">
                              <span>📶</span>
                              <span>97%</span>
                              <span>🔋</span>
                            </div>
                          </div>

                          {/* App Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 flex items-center justify-center">
                              <img
                                src="/images/michrophone.gif"
                                alt="Microphone"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 mx-4 bg-white rounded-2xl p-4 shadow-sm">
                              <p className="text-slate-800 font-medium text-center text-xs sm:text-sm md:text-base">
                                {selectedQuestion.text}
                              </p>
                            </div>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-slate-700">🏠</span>
                            </div>
                          </div>

                          {/* Answer Grid */}
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {answerOptions[selectedQuestion.id]?.map(
                              (option: AnswerOption, index: number) => (
                                <motion.button
                                  key={option.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                  }}
                                  onClick={() =>
                                    handleAnswerSelect(
                                      option.id,
                                      option.isMore,
                                      option.label
                                    )
                                  }
                                  className={`relative bg-white rounded-2xl p-3 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                                    selectedAnswer === option.id
                                      ? "ring-4 ring-violet-400 shadow-xl"
                                      : ""
                                  }`}
                                >
                                  {option.isMore ? (
                                    <>
                                      <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-white">
                                        <img
                                          src="/images/cantfindIt.png"
                                          alt="Can't find it"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <p className="text-slate-800 text-xs sm:text-sm font-medium text-center">
                                        <span className="sm:hidden">More</span>
                                        <span className="hidden sm:inline">
                                          Get More Answers
                                        </span>
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <div className="aspect-square rounded-xl overflow-hidden mb-2">
                                        <ImageWithFallback
                                          src={option.imageUrl || ""}
                                          alt={option.label}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <p className="text-slate-800 text-xs sm:text-sm font-medium text-center">
                                        {option.label}
                                      </p>
                                    </>
                                  )}
                                </motion.button>
                              )
                            )}
                          </div>

                          {/* Bottom Navigation */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-32 h-1.5 bg-slate-800 rounded-full"></div>
                          </div>

                          {/* Welcome Icon in Bottom Left */}
                          <div className="absolute bottom-4 left-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg">
                              <img
                                src="/images/welcome.png"
                                alt="Welcome"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Information Panel */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-violet-600/10"
                >
                  <h3 className="h3 mb-6">Behind the Scenes</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-lg">🎯</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Smart Suggestions
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Images selected based on context and communication
                          patterns.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-lg">⚡</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Fast Response
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Quick response times for seamless communication flow.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 text-lg">🔄</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          AI Continuous Learning
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Each interaction improves future suggestions.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
