import { ArrowLeft, Heart, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
const dogImage = "/images/verbiPose.png";
const userCentricImage = "/images/human.png";
const aiIcon = "/images/artificial-intelligence.png";
const communityHandshakeIcon = "/images/community.png";

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-lavender-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-indigo-100/40"></div>

      {/* Subtle geometric patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
          }}
          className="w-full h-full"
        ></div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-violet-600/10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-700 hover:text-violet-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Site</span>
          </button>
          <div>
            <h1 className="h1">About Us</h1>
            <p className="lead text-slate-600 mt-2">
              Empowering every voice through innovative AAC technology.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="space-y-12">
          {/* Hero Section */}
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center p-1">
                  <img
                    src={dogImage}
                    alt="Verbali"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <h2 className="h2 mb-4">Building the Future of AAC</h2>
              <p className="lead text-slate-600 mb-6">
                Verbali was born from a real need: a better way for a child to
                express himself. We are not just building AAC technology - we
                are crafting a new AAC experience to unlock new possibilities
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <p className="text-slate-700 italic text-base sm:text-sm">
                  "Communication isn't just about speaking - it's about
                  expressing yourself. That's what drives everything we do at
                  Verbali."
                </p>
                <p className="text-slate-500 mt-2 text-base sm:text-sm">
                  - The Verbali Team
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Story */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="h2 mb-6">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-slate-700 text-base sm:text-sm">
                  Verbali emerged from the real-world struggles of families
                  navigating AAC solutions. Our founder, Shay Cohen, experienced
                  firsthand the challenges of finding technology that truly
                  served his son's communication needs. That experience also
                  inspired the name of our first product, Matalk AI - "ma-talk"
                  means sweet in Hebrew, and all our children are sweet.
                </p>
                <p className="text-slate-700 text-base sm:text-sm">
                  Traditional AAC systems often felt clunky, intimidating, or
                  disconnected from how children (or their conversation
                  partners) naturally want to communicate. We saw an opportunity
                  to change that - to create something intuitive, engaging, and
                  genuinely empowering.
                </p>
                <p className="text-slate-700 text-base sm:text-sm">
                  Today, Verbali represents the convergence of cutting-edge AI
                  technology with deep understanding of human communication
                  needs. We're building the future of AAC, one natural
                  conversation at a time.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="h3 mb-2">Driven by Purpose</h3>
                <p className="text-slate-600 text-base sm:text-sm">
                  Every feature, every design decision, every line of code is
                  guided by our commitment to authentic human connection.
                </p>
              </div>
            </div>
          </motion.section>

          {/* What Sets Us Apart */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="h2 mb-8 text-center">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* AI-Powered */}
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img
                    src={aiIcon}
                    alt="AI-powered intelligence"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="h3 text-lg mb-3">AI-Powered Intelligence</h3>
                <p className="text-slate-600 text-base sm:text-sm">
                  Our advanced AI learns from each interaction, making
                  communication faster, more intuitive, and deeply personalized.
                </p>
              </div>

              {/* Human-Centered */}
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img
                    src={userCentricImage}
                    alt="User-centered design approach"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="h3 text-lg mb-3">Human-Centered Design</h3>
                <p className="text-slate-600 text-base sm:text-sm">
                  Every interface element is crafted with real users in mind -
                  children, families, therapists and educators who use AAC
                  daily.
                </p>
              </div>

              {/* Community-Driven */}
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img
                    src={communityHandshakeIcon}
                    alt="Community-driven development"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="h3 text-lg mb-3">Community-Driven</h3>
                <p className="text-slate-600 text-base sm:text-sm">
                  Built by AAC users for AAC users
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
