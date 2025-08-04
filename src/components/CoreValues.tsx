import {
  Heart,
  Dumbbell,
  Lightbulb,
  Accessibility,
  MessageCircle,
  Mic,
  Volume2,
  Waves,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
// Placeholder images - replace with actual images when available
const dogImage = "/images/verbiPose.png";
const karateChopGif = "/images/karate.gif";
const communityGif = "/images/people-celebrating.gif";
const innovationGif = "/images/out-of-the-box.gif";

export function CoreValues() {
  const [activeValue, setActiveValue] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndices, setMessageIndices] = useState([0, 0, 0, 0]); // Track message index for each value

  // Cycling messages for all values
  const valueMessages = {
    empowerment: [
      "Your voice, your choice, your power to communicate.",
      "Your child's voice belongs to them - our job is to hand over the keys.",
      "Practice sparks confidence; every tap is a step toward independence.",
      "We celebrate progress, no matter how small, because ownership starts with one word.",
    ],
    accessibility: [
      "Every voice matters. Every child deserves to be heard.",
      "From eye-gaze to dark mode, we design so everyone is invited into the conversation.",
      "When barriers fall, possibilities grow - one inclusive feature at a time.",
      "Communication shouldn't depend on cost, platform, or ability.",
    ],
    community: [
      "We understand the struggle - we feel it too.",
      "Families, SLPs, and educators gather here to share breakthroughs and lift each other higher.",
      "Together we turn everyday challenges into collective victories.",
    ],
    innovation: [
      "The future of communication is here, and it's amazing.",
      "Curiosity drives us; technology and AI fuel us.",
      "We bend the latest research into tools that feel like everyday magic.",
      "Bold ideas become life-changing moments for children and their families.",
    ],
  };

  // Reordered values: Empowerment, Accessibility, Community, Innovation
  const values = [
    {
      icon: Dumbbell,
      title: "Empowerment",
      description:
        "Every child deserves to command their own voice. We craft tools that unlock independence and spark self-confidence.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      bubbleColor: "bg-purple-100",
      chatMessage: valueMessages.empowerment[messageIndices[0]],
      voicePattern: [5, 3, 8, 4, 7, 2, 6],
      delay: 2,
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      description:
        "Inclusive by design. We tear down barriers so anyone - on any device, with any ability - can be heard.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      bubbleColor: "bg-green-100",
      chatMessage: valueMessages.accessibility[messageIndices[1]],
      voicePattern: [3, 7, 4, 8, 2, 6, 5],
      delay: 0,
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Breakthroughs happen together. We believe in the power of community to remove barriers and transform challenges into new possibilities.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      bubbleColor: "bg-pink-100",
      chatMessage: valueMessages.community[messageIndices[2]],
      voicePattern: [4, 6, 3, 7, 5, 8, 2],
      delay: 4,
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We harness cutting-edge technology and AI to transform bold ideas into life-changing breakthroughs for children and their families.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      bubbleColor: "bg-blue-100",
      chatMessage: valueMessages.innovation[messageIndices[3]],
      voicePattern: [7, 2, 5, 3, 8, 4, 6],
      delay: 6,
    },
  ];

  const currentValue = values[activeValue];

  // Effect to cycle through messages for the active value
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndices((prev) => {
        const newIndices = [...prev];
        const messageArrays = [
          valueMessages.empowerment,
          valueMessages.accessibility,
          valueMessages.community,
          valueMessages.innovation,
        ];

        // Only cycle the active value's message
        newIndices[activeValue] =
          (newIndices[activeValue] + 1) % messageArrays[activeValue].length;
        return newIndices;
      });
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(interval);
  }, [activeValue]); // Re-run when active value changes

  // Effect to auto-rotate through core values every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 20000); // Change value every 20 seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array so it runs independently

  const bubbleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const voiceBarVariants = {
    animate: {
      scaleY: [1, 1.5, 0.8, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  const typingDots = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  };

  return (
    <section className="py-12 lg:py-16 bg-[#f6f5ff] relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating speech bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 4 === 0
                ? "bg-purple-200/40"
                : i % 4 === 1
                ? "bg-blue-200/40"
                : i % 4 === 2
                ? "bg-pink-200/40"
                : "bg-green-200/40"
            }`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Robot dog companion */}
        <motion.div
          className="absolute top-16 right-12"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, 0, -2, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative w-full">
        {/* Section header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          ></motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold mb-3 text-slate-900"
          >
            Our Core Values
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Because the most meaningful conversation is a natural one.
          </motion.p>
        </div>

        {/* Main conversation interface */}
        <div className="max-w-5xl mx-auto">
          {/* Chat-like interface */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Verbali</div>
                  <div className="text-xs opacity-90 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 opacity-70" />
                  <Waves className="w-4 h-4 opacity-70" />
                </div>
              </div>
            </div>

            {/* Conversation area */}
            <div className="p-4 lg:p-6">
              {/* Value selector tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <motion.button
                      key={value.title}
                      onClick={() => {
                        setIsTyping(true);
                        setTimeout(() => {
                          setActiveValue(index);
                          setIsTyping(false);
                        }, 500);
                      }}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-sm ${
                        activeValue === index
                          ? `${value.bgColor} ${value.color} border-current shadow-md scale-105`
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span className="font-medium">{value.title}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Main conversation */}
              <div className="space-y-4">
                {/* AI message bubble */}
                <motion.div
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 p-0.5">
                    <img
                      src={dogImage}
                      alt="Verbali"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl rounded-tl-md p-3 max-w-xs">
                    <p className="text-gray-700 text-sm">
                      Let me show you how{" "}
                      <strong>{currentValue.title.toLowerCase()}</strong> shapes
                      every interaction...
                    </p>
                  </div>
                </motion.div>

                {/* Current value showcase */}
                <div className="flex justify-center">
                  <motion.div
                    key={activeValue}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`${currentValue.bgColor} rounded-2xl p-6 max-w-xl w-full border border-white/50 shadow-lg relative overflow-hidden`}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${currentValue.color
                            .replace("text-", "")
                            .replace("-600", "-200")} 1px, transparent 1px)`,
                          backgroundSize: "15px 15px",
                        }}
                      ></div>
                    </div>

                    {/* Icon and voice pattern */}
                    <div className="flex items-center justify-between mb-4 relative">
                      <motion.div
                        className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center ${currentValue.color} shadow-md`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <currentValue.icon className="w-6 h-6" />
                      </motion.div>

                      {/* Voice visualization OR Special GIFs for Accessibility, Community, and Innovation */}
                      {activeValue === 1 ? (
                        // Karate Chop GIF for Accessibility
                        <motion.div
                          className="relative w-16 h-16 flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.img
                            src={karateChopGif}
                            alt="Breaking barriers - karate chop animation"
                            className="w-full h-full object-contain gif-no-background"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />

                          {/* Optional subtle glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-green-400/20 rounded-full blur-md -z-10"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>
                      ) : activeValue === 2 ? (
                        // Community GIF for Community
                        <motion.div
                          className="relative w-16 h-16 flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.img
                            src={communityGif}
                            alt="Community celebration - people together with star"
                            className="w-full h-full object-contain gif-no-background"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />

                          {/* Optional subtle glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-pink-400/20 rounded-full blur-md -z-10"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>
                      ) : activeValue === 3 ? (
                        // Innovation GIF for Innovation
                        <motion.div
                          className="relative w-16 h-16 flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.img
                            src={innovationGif}
                            alt="Innovation lightbulb with radiating energy"
                            className="w-full h-full object-contain gif-no-background"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />

                          {/* Optional subtle glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-blue-400/20 rounded-full blur-md -z-10"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>
                      ) : (
                        // Regular voice visualization for Empowerment
                        <div className="flex items-center space-x-1">
                          {currentValue.voicePattern
                            .slice(0, 5)
                            .map((height, i) => (
                              <motion.div
                                key={i}
                                className={`w-1 rounded-full ${currentValue.color.replace(
                                  "text-",
                                  "bg-"
                                )}`}
                                style={{ height: `${height * 3}px` }}
                                animate={{
                                  scaleY: [1, 1.5, 0.8, 1.2, 1],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                        </div>
                      )}
                    </div>

                    <h3
                      className={`text-xl font-bold ${currentValue.color} mb-2`}
                    >
                      {currentValue.title}
                    </h3>
                    <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                      {currentValue.description}
                    </p>

                    {/* Chat message */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                      <div className="flex items-start space-x-2">
                        <MessageCircle
                          className={`w-3.5 h-3.5 mt-0.5 ${currentValue.color} flex-shrink-0`}
                        />
                        <AnimatePresence mode="wait">
                          {isTyping ? (
                            <motion.div
                              key="typing"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex space-x-1"
                            >
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                  variants={typingDots}
                                  animate="animate"
                                  transition={{ delay: i * 0.2 }}
                                />
                              ))}
                            </motion.div>
                          ) : (
                            <motion.p
                              key={`message-${activeValue}-${messageIndices[activeValue]}`}
                              initial={{ opacity: 0, x: 30, scale: 0.95 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: -30, scale: 0.95 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.6,
                              }}
                              className="text-gray-700 text-sm italic"
                            >
                              "{currentValue.chatMessage}"
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* User response bubble */}
                <motion.div
                  className="flex items-start space-x-2 justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl rounded-tr-md p-3 max-w-xs">
                    <p className="text-gray-700 text-sm">
                      This is exactly what we need for better communication! 💜
                    </p>
                  </div>
                  <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">👤</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Chat input (decorative) */}
            <div className="border-t border-gray-100 p-3 bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-white rounded-full px-3 py-2 border border-gray-200">
                  <div className="text-gray-400 text-sm">
                    Every voice matters at Verbali...
                  </div>
                </div>
                <motion.button
                  className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom insight */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden max-w-xl mx-auto">
              {/* Gradient Top Border */}
              <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>

              <div className="p-6">
                <p className="text-slate-600 italic leading-relaxed text-sm">
                  "Like Shay said, AAC should be intuitive, fast, and
                  empowering. Our values ensure every feature we build serves
                  that mission—helping every child find their unique voice."
                </p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-purple-600">
                    The Verbali Team
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
