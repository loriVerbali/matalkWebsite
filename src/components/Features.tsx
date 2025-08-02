"use client";

import { motion } from "framer-motion";
import { Sparkles, Sprout, Rocket } from "lucide-react";
// Placeholder image - replace with actual image when available
const maTalkLogo = "/images/MatalkLogoWeb.png";

export function Features() {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"></div>

      {/* Floating Speech Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large speech bubbles */}
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

        <motion.div
          className="absolute top-32 right-20"
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
            rotate: [0, -4, 0, 6, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <svg className="w-20 h-16 opacity-12" viewBox="0 0 80 64" fill="none">
            <path
              d="M6 6C6 2.686 8.686 0 12 0H68C71.314 0 74 2.686 74 6V38C74 41.314 71.314 44 68 44H18L6 64V6Z"
              fill="url(#bubbleGrad2)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-24 left-16"
          animate={{
            y: [0, 20, 0],
            x: [0, 25, 0],
            rotate: [0, 8, 0, -5, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <svg
            className="w-28 h-22 opacity-10"
            viewBox="0 0 112 88"
            fill="none"
          >
            <path
              d="M10 10C10 4.477 14.477 0 20 0H92C97.523 0 102 4.477 102 10V58C102 63.523 97.523 68 92 68H28L10 88V10Z"
              fill="url(#bubbleGrad3)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Medium speech bubbles */}
        <motion.div
          className="absolute top-64 left-1/3"
          animate={{
            y: [0, -18, 0],
            x: [0, 12, 0],
            rotate: [0, -6, 0, 4, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg className="w-16 h-13 opacity-18" viewBox="0 0 64 52" fill="none">
            <path
              d="M5 5C5 2.239 7.239 0 10 0H54C56.761 0 59 2.239 59 5V31C59 33.761 56.761 36 54 36H15L5 52V5Z"
              fill="url(#bubbleGrad4)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad4"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-1/4"
          animate={{
            y: [0, 22, 0],
            x: [0, -18, 0],
            rotate: [0, 7, 0, -8, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <svg className="w-18 h-14 opacity-14" viewBox="0 0 72 56" fill="none">
            <path
              d="M6 6C6 2.686 8.686 0 12 0H60C63.314 0 66 2.686 66 6V34C66 37.314 63.314 40 60 40H18L6 56V6Z"
              fill="url(#bubbleGrad5)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad5"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Small speech bubbles */}
        <motion.div
          className="absolute top-20 left-2/3"
          animate={{
            y: [0, -12, 0],
            x: [0, 8, 0],
            rotate: [0, 4, 0, -6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <svg className="w-12 h-10 opacity-20" viewBox="0 0 48 40" fill="none">
            <path
              d="M4 4C4 1.791 5.791 0 8 0H40C42.209 0 44 1.791 44 4V24C44 26.209 42.209 28 40 28H12L4 40V4Z"
              fill="url(#bubbleGrad6)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad6"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-1/2"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            rotate: [0, -5, 0, 3, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <svg className="w-10 h-8 opacity-22" viewBox="0 0 40 32" fill="none">
            <path
              d="M3 3C3 1.343 4.343 0 6 0H34C35.657 0 37 1.343 37 3V19C37 20.657 35.657 22 34 22H9L3 32V3Z"
              fill="url(#bubbleGrad7)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad7"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-48 right-8"
          animate={{
            y: [0, -20, 0],
            x: [0, 14, 0],
            rotate: [0, 9, 0, -4, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          }}
        >
          <svg className="w-14 h-11 opacity-16" viewBox="0 0 56 44" fill="none">
            <path
              d="M4 4C4 1.791 5.791 0 8 0H48C50.209 0 52 1.791 52 4V26C52 28.209 50.209 30 48 30H12L4 44V4Z"
              fill="url(#bubbleGrad8)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad8"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Tiny floating speech bubbles */}
        <motion.div
          className="absolute top-8 left-1/4"
          animate={{
            y: [0, -8, 0],
            x: [0, 6, 0],
            rotate: [0, 12, 0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <svg className="w-8 h-6 opacity-25" viewBox="0 0 32 24" fill="none">
            <path
              d="M2 2C2 0.895 2.895 0 4 0H28C29.105 0 30 0.895 30 2V14C30 15.105 29.105 16 28 16H6L2 24V2Z"
              fill="url(#bubbleGrad9)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad9"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-1/3"
          animate={{
            y: [0, 12, 0],
            x: [0, -8, 0],
            rotate: [0, -10, 0, 6, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2,
          }}
        >
          <svg className="w-6 h-5 opacity-28" viewBox="0 0 24 20" fill="none">
            <path
              d="M2 2C2 0.895 2.895 0 4 0H20C21.105 0 22 0.895 22 2V12C22 13.105 21.105 14 20 14H6L2 20V2Z"
              fill="url(#bubbleGrad10)"
            />
            <defs>
              <linearGradient
                id="bubbleGrad10"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-100/60 to-blue-100/60 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-l from-indigo-100/60 to-purple-100/60 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-gradient-to-r from-blue-100/40 to-indigo-200/40 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Chat Bubbles */}
      <motion.div
        className="absolute top-16 right-20 glass-bubble p-3"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          className="w-5 h-4"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2C2 0.895 2.895 0 4 0H16C17.105 0 18 0.895 18 2V10C18 11.105 17.105 12 16 12H6L2 16V2Z"
            fill="url(#speechGradient1)"
          />
          <defs>
            <linearGradient
              id="speechGradient1"
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

      <motion.div
        className="absolute bottom-32 left-16 glass-bubble p-4"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg
          className="w-7 h-6"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3C3 1.343 4.343 0 6 0H22C23.657 0 25 1.343 25 3V15C25 16.657 23.657 18 22 18H8L3 24V3Z"
            fill="url(#speechGradient2)"
          />
          <defs>
            <linearGradient
              id="speechGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 glass-bubble p-2"
        animate={{
          y: [0, -8, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg
          className="w-4 h-3"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 1.5C1.5 0.672 2.172 0 3 0H13C13.828 0 14.5 0.672 14.5 1.5V7.5C14.5 8.328 13.828 9 13 9H5L1.5 12V1.5Z"
            fill="url(#speechGradient3)"
          />
          <defs>
            <linearGradient
              id="speechGradient3"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-12"
        >
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-t-2xl"></div>

          {/* Content */}
          <div className="pt-6">
            {/* Header with Logo and Patent Notice */}
            <div className="relative mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl md:text-4xl font-bold text-gray-800 font-sans"
                >
                  Re-imagining AAC with Ma-Talk AI App
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg blur-sm opacity-20 animate-pulse"></div>
                    <span className="relative px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-violet-700 bg-gradient-to-r from-violet-50 to-indigo-50 border sm:border-2 border-violet-200 rounded-full sm:rounded-lg shadow-lg flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Patent Pending
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lead text-gray-600 max-w-3xl font-sans"
              >
                At Verbali, we believe every child deserves a voice.{" "}
                <strong>The Ma-Talk AI mobile app</strong> pairs
                state-of-the-art language models with thoughtful AAC design to
                deliver an experience that is intuitive, responsive, and feels
                like a real conversation partner. empowering users to speak up
                faster and more naturally than ever before.
              </motion.p>

              {/* Verbali Logo as "stamp" positioned between paragraph and Empowering card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  },
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                className="absolute bottom-4 right-4 sm:top-2 sm:right-8 cursor-pointer"
              >
                <img
                  src={maTalkLogo}
                  alt="Verbali Logo"
                  className="w-10 h-10 sm:w-[70px] sm:h-[70px] object-contain opacity-90 rounded-[16px]"
                  style={{
                    filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15))",
                  }}
                />
              </motion.div>
            </div>

            {/* Three Feature Columns */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Intuitive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="purple-themed-card p-6 text-center md:text-left cursor-pointer"
              >
                {/* Animated circular shape */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-purple-200/50 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Sparkles className="w-6 h-6 text-purple-700 mr-2" />
                    <h3 className="text-lg font-semibold text-purple-700 font-sans">
                      Intuitive
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 font-sans">
                    Designed to feel natural—adapting effortlessly to how each
                    person communicates
                  </p>
                </div>
              </motion.div>

              {/* Adaptive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="blue-themed-card p-6 text-center md:text-left cursor-pointer"
              >
                {/* Animated circular shape */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-blue-200/50 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Sprout className="w-6 h-6 text-blue-700 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-700 font-sans">
                      Adaptive
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 font-sans">
                    AI-driven technology that delivers a personalized experience
                    tailored to each user's unique needs
                  </p>
                </div>
              </motion.div>

              {/* Empowering */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="indigo-themed-card p-6 text-center md:text-left cursor-pointer"
              >
                {/* Animated circular shape */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-200/50 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Rocket className="w-6 h-6 text-indigo-700 mr-2" />
                    <h3 className="text-lg font-semibold text-indigo-700 font-sans">
                      Empowering
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 font-sans">
                    Giving everyone the power to confidently express themselves
                    and engage meaningfully
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
