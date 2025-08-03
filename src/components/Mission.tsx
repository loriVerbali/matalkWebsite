import { ArrowLeft, Target, Zap, Globe, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
// Placeholder image - replace with actual image when available
const swingingDog = "/images/verbiMission.png";
import { FloatingWatermark } from "./FloatingWatermark";

interface MissionProps {
  onBack: () => void;
}

export function Mission({ onBack }: MissionProps) {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Parachuting Dogs */}
      <FloatingWatermark />

      {/* Header */}
      <div className="bg-white border-b border-violet-600/10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-700 hover:text-violet-600 transition-colors mb-3 sm:mb-4 touch-target"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base">Back to Site</span>
          </button>
          <div>
            <h1 className="h1">Our Mission</h1>
            <p className="lead text-slate-600 mt-2 sm:mt-2">
              Transforming AAC through AI to unlock every child's natural voice.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 relative z-10">
        <div className="space-y-6 sm:space-y-12">
          {/* Mission Statement */}
          <motion.section
            className="text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-12 text-white">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="h2 text-white mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-lg sm:text-xl leading-relaxed text-white/95 max-w-3xl mx-auto">
                Harness cutting-edge technology to create intuitive tools that
                empower people with special needs to achieve their fullest
                potential - and navigate life confidently, free of barriers.
              </p>
            </div>

            {/* Swinging Robot Dog */}
            <div className="absolute -right-20 top-0.5 hidden lg:block">
              <motion.img
                src={swingingDog}
                alt="Robot dog swinging"
                className="w-32 h-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.section>

          {/* Vision */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="h2 mb-3 sm:mb-4">Our Vision</h2>
              <p className="lead text-slate-600">
                A world where every child has an equal voice in every
                conversation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8">
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed text-center">
                We envision a future where AAC technology is so intuitive, so
                natural, and so empowering that it becomes invisible - allowing
                authentic human connection to shine through. Where children and
                adults using AAC aren't limited by their tools, but liberated by
                them.
              </p>
            </div>
          </motion.section>

          {/* How do we measure success? */}
          <motion.section
            className="card mt-8 sm:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="h2 mb-6 sm:mb-8 text-center">
              How do we measure success?
            </h2>

            <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl text-center">
              <p className="text-slate-700 italic text-base sm:text-lg leading-relaxed">
                "Success isn't counted in downloads or revenue - it's measured
                by the real-world impact of our products, every time someone
                uses Verbali to express themselves in a way they never could
                before."
              </p>
              <p className="text-base sm:text-sm text-slate-500 mt-3 sm:mt-2">
                - The Verbali Team
              </p>
            </div>
          </motion.section>

          {/* Core Goals */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="h2 mb-6 sm:mb-8 text-center">
              How We're Making It Happen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-6">
              {/* Innovation */}
              <div className="bg-purple-50 rounded-xl p-5 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="h3 text-base sm:text-lg">
                    Driving Innovation
                  </h3>
                </div>
                <p className="text-slate-600 mb-3 sm:mb-4 text-base sm:text-base">
                  Pushing the boundaries of what's possible in AAC technology
                  through advanced AI and machine learning.
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-base sm:text-sm text-slate-600">
                  <li>
                    • Natural language processing for intuitive communication
                  </li>
                  <li>
                    • Predictive text that learns individual communication
                    patterns
                  </li>
                  <li>• Voice synthesis that sounds natural and expressive</li>
                  <li>
                    • Real-time adaptation to user preferences and context
                  </li>
                </ul>
              </div>

              {/* Accessibility */}
              <div className="bg-green-50 rounded-xl p-5 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="h3 text-base sm:text-lg">Universal Access</h3>
                </div>
                <p className="text-slate-600 mb-3 sm:mb-4 text-base sm:text-base">
                  Ensuring our technology works for everyone, regardless of
                  ability, device, or economic situation.
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-base sm:text-sm text-slate-600">
                  <li>• Cross-platform compatibility (iOS, Android)</li>
                  <li>• Multiple input methods and integrations</li>
                  <li>
                    • Adjustable interfaces for different cognitive abilities
                  </li>
                  <li>
                    • Affordable pricing models for families and schools (future
                    offering)
                  </li>
                </ul>
              </div>

              {/* Empowerment */}
              <div className="bg-blue-50 rounded-xl p-5 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="h3 text-base sm:text-lg">User Empowerment</h3>
                </div>
                <p className="text-slate-600 mb-3 sm:mb-4 text-base sm:text-base">
                  We envision independence for everyone, so our design and
                  user-experience principles ensure the AAC tool works for the
                  user—not the other way around.
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-base sm:text-sm text-slate-600">
                  <li>• Simplicity & intuitive design</li>
                  <li>• Family and therapist collaboration features</li>
                  <li>• Adaptive technology that grows with the user</li>
                  <li>• Data ownership & privacy protection</li>
                </ul>
              </div>

              {/* Community */}
              <div className="bg-pink-50 rounded-xl p-5 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="h3 text-base sm:text-lg">
                    Community Partnership
                  </h3>
                </div>
                <p className="text-slate-600 mb-3 sm:mb-4 text-base sm:text-base">
                  Building alongside the AAC community, not in isolation from
                  it.
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-base sm:text-sm text-slate-600">
                  <li>• Regular feedback from SLPs and educators</li>
                  <li>• User-driven feature development</li>
                  <li>• Research partnerships with academic institutions</li>
                  <li>
                    • Ongoing open dialogue with the speech-therapy community
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
