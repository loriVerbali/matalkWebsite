import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { PlanCards, ScheduleDemoCTA } from "./PlanCards";

interface PricingProps {
  onBack: () => void;
}

const FAQS: { question: string; answer: React.ReactNode }[] = [
  {
    question:
      "What is the difference between MaTalk AI and MaTalk AI Forever?",
    answer: (
      <>
        Same app, same features. <strong>MaTalk AI</strong> is a subscription
        you can cancel anytime. <strong>MaTalk AI Forever</strong> is license
        based — you pay once and the app is yours forever.
      </>
    ),
  },
  {
    question: "My school uses Apple School Manager — do you support that?",
    answer: (
      <>
        Yes. Both apps are available through{" "}
        <strong>Apple School Manager</strong>, so a school or district buys
        licenses in volume, assigns them to student iPads, and reassigns them as
        classes change. Email{" "}
        <a
          href="mailto:info@verbali.io"
          className="text-violet-600 hover:underline"
        >
          info@verbali.io
        </a>{" "}
        and we'll walk you through it, or schedule a demo first.
      </>
    ),
  },
  {
    question: "We use Apple Business Manager — is that supported?",
    answer: (
      <>
        Yes. Clinics, practices and organizations can buy and distribute both
        apps through <strong>Apple Business Manager</strong> the same way,
        assigning licenses to devices or users and reassigning them as staff and
        caseloads change.
      </>
    ),
  },
  {
    question: "Is there a free trial?",
    answer: (
      <>
        Yes! We offer a <strong>7-day free trial</strong> so you can explore all
        features with no commitment.
      </>
    ),
  },
  {
    question: "What's included in my subscription?",
    answer:
      "Your subscription includes unlimited AAC card creation, AI-powered speech processing, cloud sync across all your devices, and regular feature updates. Annual subscribers also get priority support.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. If you switch from monthly to annual, you'll be credited for unused monthly time. Downgrades take effect at your next billing cycle.",
  },
  {
    question: "Which resellers do you work with?",
    answer: (
      <>
        We currently work with <strong>AbleNet</strong> and are expanding our
        reseller network. If you use another reseller, email us at{" "}
        <a
          href="mailto:info@verbali.io"
          className="text-violet-600 hover:underline"
        >
          info@verbali.io
        </a>
        —we'd love to connect with them.
      </>
    ),
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data remains accessible for 30 days after cancellation, giving you time to export your AAC cards and settings. After 30 days, your account data is permanently deleted for your privacy.",
  },
];

export function Pricing({ onBack }: PricingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto mobile-container">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 -ml-4 text-slate-600 hover:text-violet-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-xs sm:text-sm font-bold tracking-[0.08em] uppercase px-5 sm:px-6 py-2.5 rounded-full whitespace-nowrap shadow-lg shadow-violet-500/30">
            Patent Pending
          </span>
          <h1 className="h1 text-slate-900">
            Choose your <span className="text-gradient">Matalk AI</span> plan
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Two apps, same MaTalk AI. Both include the adaptive symbol grid,
            Live Listen &amp; Suggest, Smart Starters, AI image generation,
            cloud sync across devices, customer support, and every future
            update.
          </p>
        </div>

        {/* Plans */}
        <PlanCards location="pricing_page" size="large" />

        {/* Schools & clinics — schedule a demo */}
        <div className="mt-12">
          <ScheduleDemoCTA location="pricing_page" />
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="h2 text-center text-slate-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                <h3 className="h3 text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
