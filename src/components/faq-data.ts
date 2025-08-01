import { FAQItem } from "./faq-types";

// Only show 5 specific questions on home page
export const homeFaqs: FAQItem[] = [
  {
    question: "What is Verbali and Ma-Talk AI?",
    answer:
      "Verbali is the company; Ma-Talk AI is our flagship app that turns any tablet or phone into an AI-powered communication copilot for kids with speech challenges.",
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
    actionText: "View Pricing",
    actionType: "pricing",
  },
  {
    question: "Is my child's data safe?",
    answer:
      "Yes. All data is encrypted in transit and at rest. We follow child-privacy regulations, never sell or share personal information, and give parents the ability to delete data at any time.",
  },
];
