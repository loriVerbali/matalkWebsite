import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface NewsProps {
  onBack: () => void;
}

export function News({ onBack }: NewsProps) {
  return (
    <div className="min-h-screen bg-lavender-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-indigo-100/40"></div>

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
            <h1 className="h1">News</h1>
            <p className="lead text-slate-600 mt-2">
              Updates and partnerships from Verbali.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="space-y-8">
          {/* Cornell Tech – Dec 2025 */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-violet-600 mb-4">Feb 2026</p>
            <h2 className="h2 mb-6">
              New Feature: Export and Import your profile without re-configuring
            </h2>
            <p className="text-slate-600 mb-6">
              You will soon be able to use our latest feature! You can model and
              configure on one tablet and upload that board and other
              customizations on other tablets. We will soon be able to provide
              situational boards for certain environments and scenarios.
              Profiles are always saved to your personal gmail account or
              however you choose to share them we dont store them or save them
              on our systems.
            </p>
            <p className="text-slate-600 mb-0">
              For more information or to get involved, contact us at{" "}
              <a
                href="mailto:info@verbali.com"
                className="text-blue-500 hover:text-blue-600"
              >
                info@verbali.com
              </a>
            </p>
          </motion.section>

          {/* Virginia Tech – Jan 2026 */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm font-medium text-violet-600 mb-4">Dec 2025</p>
            <h2 className="h2 mb-6">
              DaVoice Wakeword Collaboration with Verbali
            </h2>
            <p className="text-slate-600 mb-6">
              Verbali is proud to be a design partner with Davoice Wakeword to
              create an amazing experience for children with AAC needs. Davoice
              Wakeword is an amazing AI powered wakeword engine that triggers
              our trusted helper Verbi to get the conversation started. We
              tested Davoice Wakeword at ATIA in January 2026 and it was a huge
              success! We are excited to be part of this journey and to help
              shape the future of AAC. Our tablets where in an Exhibition booth
              and standing a 2 feet away when we said "Hey Verbi" -- DaVoice
              jumped into action and triggered all them just like magic! Check
              out{" "}
              <a
                href="https://davoice.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                https://davoice.io
              </a>{" "}
              for more information on how to use DaVoice Wakeword
            </p>
            <p className="text-slate-600 mb-0">
              For more information or to get involved, contact us at{" "}
              <a
                href="mailto:info@verbali.com"
                className="text-blue-500 hover:text-blue-600"
              >
                info@verbali.com
              </a>
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
