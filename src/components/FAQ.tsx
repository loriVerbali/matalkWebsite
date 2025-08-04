import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
// Placeholder image - replace with actual image when available
const graduationRobotDog = "/images/verbiStudent.png";
import { FAQItem, FAQProps } from "./faq-types";
import { homeFaqs } from "./faq-data";
import { useFAQActions } from "./faq-actions";

export function FAQ({ onNavigate }: FAQProps = {}) {
  const handleAction = useFAQActions(onNavigate);

  return (
    <section className="py-20 lg:py-28 bg-[#eff3fd] relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h2 mb-4 text-slate-900"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lead text-slate-600 max-w-2xl mx-auto"
          >
            Quick answers to common questions about Verbali
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 bg-white/90 backdrop-blur-lg border border-blue-100/50 shadow-xl relative"
        >
          {/* Graduation Robot Dog on top right */}
          <div className="absolute -top-20 right-8 z-10">
            <img
              src={graduationRobotDog}
              alt="Ma-Talk AI graduation companion"
              className="w-24 h-24 object-contain drop-shadow-xl"
            />
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {homeFaqs.map((faq, index) => (
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

          {/* Link to full FAQ page */}
          <div className="text-center mt-8 pt-6 border-t border-blue-100/60">
            <button
              onClick={() => onNavigate && onNavigate("faq")}
              className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              View all questions →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating decoration elements */}
      <div className="absolute top-32 right-16 w-20 h-20 bg-blue-200/40 rounded-full blur-lg opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-28 h-28 bg-indigo-200/30 rounded-full blur-xl opacity-50"></div>
    </section>
  );
}
