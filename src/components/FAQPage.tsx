import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
  hasAction?: boolean;
  actionText?: string;
  actionType?: string;
}

interface FAQPageProps {
  onBack: () => void;
  onNavigate?: (
    page: "feature-request" | "language-request" | "pricing"
  ) => void;
}

export function FAQPage({ onBack, onNavigate }: FAQPageProps) {
  // Handle action button clicks
  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "android-updates":
        // Could open a modal or redirect to Android signup
        console.log("Android updates requested");
        break;
      case "request-language":
        if (onNavigate) {
          onNavigate("language-request");
        } else {
          console.log("Language request initiated");
        }
        break;
      case "suggest-feature":
        if (onNavigate) {
          onNavigate("feature-request");
        } else {
          console.log("Feature suggestion initiated");
        }
        break;
      case "pricing":
        if (onNavigate) {
          onNavigate("pricing");
        } else {
          console.log("Pricing page navigation initiated");
        }
        break;
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is Verbali and Ma-Talk AI?",
      answer:
        "Verbali is the company; Ma-Talk AI is our flagship app that turns any tablet or phone into an AI-powered communication copilot for kids with speech challenges.",
    },
    {
      question: "Why is it invite-only right now?",
      answer:
        "We're running a closed pilot so we can partner closely with families and speech-language pathologists (SLPs), gather feedback, and refine every detail before the public launch.",
    },
    {
      question: "How can I get an invite?",
      answer:
        "Join the wait-list through this link - we review new testers every week and email invite codes as slots open.",
    },
    {
      question: "What mobile platforms are supported?",
      answer:
        "iPhone / iPad: available today.\n\nAndroid: in development, launching later this year - join the wait-list and we'll alert you first.",
      hasAction: true,
      actionText: "Get Android updates",
      actionType: "android-updates",
    },
    {
      question: "How much does it cost?",
      answer: "See the full pricing options on our Pricing page.",
      hasAction: true,
      actionText: "Pricing page",
      actionType: "pricing",
    },
    {
      question: "Who can benefit from Ma-Talk AI?",
      answer:
        "Any communicator who already uses, or could benefit from, Augmentative & Alternative Communication (AAC).",
    },
    {
      question: "Is my child's data safe?",
      answer:
        "Yes. All data is encrypted in transit and at rest. We follow child-privacy regulations, never sell or share personal information, and give parents the ability to delete data at any time.",
    },
    {
      question: "How do we use the data?",
      answer:
        "We look only at aggregated usage patterns - never your child's personal content - to fine-tune suggestions, boost conversation quality, and shape new features. All information stays within Verbali and is protected by encryption at rest and in transit.",
    },
    {
      question: "What languages does Ma-Talk AI support?",
      answer:
        "English today, with more languages coming soon. Need a particular language?",
      hasAction: true,
      actionText: "Request a language",
      actionType: "request-language",
    },
    {
      question: "Can I suggest specific features?",
      answer:
        "Yes! Delivering the best conversation experience is our north star. Tell us what would help—",
      hasAction: true,
      actionText: "Suggest a feature",
      actionType: "suggest-feature",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/60 relative overflow-hidden">
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
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center text-violet-600 hover:text-violet-700 transition-colors mb-8"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative pb-20">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h1 mb-4 text-slate-900"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lead text-slate-600 max-w-2xl mx-auto"
          >
            Everything you need to know about Verbali and Ma-Talk AI
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 bg-white/90 backdrop-blur-lg border border-blue-100/50 shadow-xl"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-blue-100/60 rounded-xl px-6 py-2 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-slate-900 font-semibold pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 pb-6 pt-2 leading-relaxed">
                  <div className="space-y-3">
                    {faq.answer.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-slate-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    {faq.hasAction && faq.actionType && (
                      <button
                        onClick={() => handleAction(faq.actionType!)}
                        className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium transition-colors mt-2"
                      >
                        → {faq.actionText}
                      </button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:info@verbail.io"
            className="btn-secondary inline-block"
          >
            Contact Support
          </a>
        </motion.div>
      </div>

      {/* Floating decoration elements */}
      <div className="absolute top-32 right-16 w-20 h-20 bg-blue-200/40 rounded-full blur-lg opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-28 h-28 bg-indigo-200/30 rounded-full blur-xl opacity-50"></div>
    </div>
  );
}
