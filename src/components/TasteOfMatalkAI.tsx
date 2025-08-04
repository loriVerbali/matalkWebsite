import { useState } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import maTalkLogo from "/images/MatalkLogoWeb.png";

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

const questions: Question[] = [
  {
    id: "school-day",
    text: "Hey sweetie, how was your day at school today? What was your favorite part?",
    category: "School",
  },
  {
    id: "bedtime-routine",
    text: "What a cozy car ride! When we get home, what do you want to do before bed?",
    category: "Bedtime",
  },
  {
    id: "school-week",
    text: "Hey sweetheart! It's a cozy evening. What fun things did you do at school this week?",
    category: "School",
  },
  {
    id: "art-projects",
    text: "That sounds like a great time! What art project did you enjoy the most at school?",
    category: "Art",
  },
  {
    id: "dentist-feelings",
    text: "Hey buddy! We're at the dentist today. How are you feeling about that?",
    category: "Feelings",
  },
  {
    id: "dentist-activities",
    text: "It's okay to feel nervous! What do you think we'll do here at the dentist?",
    category: "Healthcare",
  },
  {
    id: "airport-trip",
    text: "Hey sweetheart! We're at the airport, how exciting! What are you most looking forward to on our trip?",
    category: "Travel",
  },
  {
    id: "breakfast-choice",
    text: "Hey! Good morning! What do you want to eat for breakfast?",
    category: "Food",
  },
  {
    id: "morning-activities",
    text: "Hey! Good morning! It's so sunny today! What should we do after breakfast?",
    category: "Outdoor",
  },
  {
    id: "shade-games",
    text: "Great idea! Let's sit under that tree. What game do you want to play in the shade?",
    category: "Games",
  },
  {
    id: "winter-activities",
    text: "Hey there! It's so cold and snowy outside. What fun things have you been thinking about doing this winter?",
    category: "Winter",
  },
  {
    id: "dream-about",
    text: "Alright! It's bedtime now, but before you sleep, what do you want to dream about? 🎈",
    category: "Dreams",
  },
  {
    id: "train-station-see",
    text: "Hi sweetie! We're at the train station on a windy day. What do you think we're going to see here? 🌬️🚆",
    category: "Travel",
  },
  {
    id: "train-station-wait",
    text: "Hi honey! It's warm and windy here at the train station. What do you think would be fun to do while we wait? 🌬️🚉",
    category: "Activities",
  },
  {
    id: "movie-night",
    text: "Hey sweetie! It's the weekend, and the weather is so nice. What movie do you want to watch tonight? 🌟",
    category: "Entertainment",
  },
  {
    id: "dentist-feelings-2",
    text: "Hey sweetie, how are you feeling about being at the dentist today?",
    category: "Feelings",
  },
];

const answerOptions: Record<string, AnswerOption[]> = {
  "school-day": [
    {
      id: "playing-outside",
      label: "Playing outside",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    {
      id: "story-time",
      label: "Story time",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "snack-time",
      label: "Snack time",
      imageUrl:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=200&fit=crop",
    },
    {
      id: "singing-songs",
      label: "Singing songs",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      id: "drawing-pictures",
      label: "Drawing pictures",
      imageUrl:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    { id: "more-school", label: "Get more answers", isMore: true },
  ],
  "bedtime-routine": [
    {
      id: "drink-warm-milk",
      label: "Drink warm milk",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
    {
      id: "play-with-toys",
      label: "Play with toys",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: "take-a-bath",
      label: "Take a bath",
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    },
    {
      id: "sing-a-song",
      label: "Sing a song",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      id: "read-a-story",
      label: "Read a story",
      imageUrl:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    },
    { id: "more-bedtime", label: "Get more answers", isMore: true },
  ],
  "school-week": [
    {
      id: "painting",
      label: "Painting",
      imageUrl:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop",
    },
    {
      id: "singing",
      label: "Singing",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      id: "drawing",
      label: "Drawing",
      imageUrl:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    {
      id: "storytime",
      label: "Storytime",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "playing",
      label: "Playing",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    { id: "more-school-week", label: "Get more answers", isMore: true },
  ],
  "art-projects": [
    {
      id: "drawing",
      label: "Drawing",
      imageUrl:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    {
      id: "clay",
      label: "Clay",
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      id: "paper-craft",
      label: "Paper craft",
      imageUrl:
        "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
    },
    {
      id: "collage",
      label: "Collage",
      imageUrl:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop",
    },
    {
      id: "painting",
      label: "Painting",
      imageUrl:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop",
    },
    { id: "more-art", label: "Get more answers", isMore: true },
  ],
  "dentist-feelings": [
    {
      id: "scared",
      label: "Scared",
      imageUrl:
        "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?w=300&h=200&fit=crop",
    },
    {
      id: "happy",
      label: "Happy",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
    },
    {
      id: "nervous",
      label: "Nervous",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "excited",
      label: "Excited",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=200&fit=crop",
    },
    {
      id: "okay",
      label: "Okay",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    },
    { id: "more-feelings", label: "Get more answers", isMore: true },
  ],
  "dentist-activities": [
    {
      id: "brush",
      label: "Brush",
      imageUrl:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=200&fit=crop",
    },
    {
      id: "clean",
      label: "Clean",
      imageUrl:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=200&fit=crop",
    },
    {
      id: "fix",
      label: "Fix",
      imageUrl:
        "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=300&h=200&fit=crop",
    },
    {
      id: "look",
      label: "Look",
      imageUrl:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    },
    {
      id: "checkup",
      label: "Checkup",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    },
    { id: "more-dentist", label: "Get more answers", isMore: true },
  ],
  "airport-trip": [
    {
      id: "swimming",
      label: "Swimming",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    {
      id: "beach",
      label: "Beach",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
    },
    {
      id: "animals",
      label: "Animals",
      imageUrl:
        "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=300&h=200&fit=crop",
    },
    {
      id: "toys",
      label: "Toys",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: "ice-cream",
      label: "Ice cream",
      imageUrl:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=200&fit=crop",
    },
    { id: "more-trip", label: "Get more answers", isMore: true },
  ],
  "breakfast-choice": [
    {
      id: "cereal",
      label: "Cereal",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: "eggs",
      label: "Eggs",
      imageUrl:
        "https://images.unsplash.com/photo-1582169296194-9bcb03134c8a?w=300&h=200&fit=crop",
    },
    {
      id: "toast",
      label: "Toast",
      imageUrl:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
    },
    {
      id: "banana",
      label: "Banana",
      imageUrl:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop",
    },
    {
      id: "pancakes",
      label: "Pancakes",
      imageUrl:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300&h=200&fit=crop",
    },
    { id: "more-breakfast", label: "Get more answers", isMore: true },
  ],
  "morning-activities": [
    {
      id: "ride-bikes",
      label: "Ride bikes",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
    {
      id: "pick-flowers",
      label: "Pick flowers",
      imageUrl:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=200&fit=crop",
    },
    {
      id: "feed-animals",
      label: "Feed animals",
      imageUrl:
        "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=300&h=200&fit=crop",
    },
    {
      id: "take-a-nap",
      label: "Take a nap",
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    },
    {
      id: "play-outside",
      label: "Play outside",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    { id: "more-morning", label: "Get more answers", isMore: true },
  ],
  "shade-games": [
    {
      id: "tag",
      label: "Tag",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    {
      id: "simon-says",
      label: "Simon says",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "duck-duck-goose",
      label: "Duck duck goose",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      id: "hopscotch",
      label: "Hopscotch",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    {
      id: "hide-and-seek",
      label: "Hide and seek",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=200&fit=crop",
    },
    { id: "more-games", label: "Get more answers", isMore: true },
  ],
  "winter-activities": [
    {
      id: "sledding",
      label: "Sledding",
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      id: "hot-chocolate",
      label: "Drinking hot chocolate",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
    {
      id: "snow-angels",
      label: "Making snow angels",
      imageUrl:
        "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=300&h=200&fit=crop",
    },
    {
      id: "playing-inside",
      label: "Playing inside",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: "building-snowman",
      label: "Building a snowman",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop",
    },
    { id: "more-winter", label: "Get more answers", isMore: true },
  ],
  "dream-about": [
    {
      id: "dinosaurs",
      label: "Dinosaurs",
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      id: "space",
      label: "Space",
      imageUrl:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop",
    },
    {
      id: "butterflies",
      label: "Butterflies",
      imageUrl:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=200&fit=crop",
    },
    {
      id: "puppies",
      label: "Puppies",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=200&fit=crop",
    },
    {
      id: "unicorns",
      label: "Unicorns",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    { id: "more-dreams", label: "Get more answers", isMore: true },
  ],
  "train-station-see": [
    {
      id: "people",
      label: "People",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "bags",
      label: "Bags",
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    },
    {
      id: "tracks",
      label: "Tracks",
      imageUrl:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
    },
    {
      id: "birds",
      label: "Birds",
      imageUrl:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=200&fit=crop",
    },
    {
      id: "train",
      label: "Train",
      imageUrl:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
    },
    { id: "more-station", label: "Get more answers", isMore: true },
  ],
  "train-station-wait": [
    {
      id: "play-i-spy",
      label: "Play I spy",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "draw-with-chalk",
      label: "Draw with chalk",
      imageUrl:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    {
      id: "play-tag",
      label: "Play tag",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
    {
      id: "count-trains",
      label: "Count trains",
      imageUrl:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
    },
    {
      id: "blow-bubbles",
      label: "Blow bubbles",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=200&fit=crop",
    },
    { id: "more-wait", label: "Get more answers", isMore: true },
  ],
  "movie-night": [
    {
      id: "frozen",
      label: "Frozen",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop",
    },
    {
      id: "toy-story",
      label: "Toy Story",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: "moana",
      label: "Moana",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
    },
    {
      id: "minions",
      label: "Minions",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=200&fit=crop",
    },
    {
      id: "paw-patrol",
      label: "Paw Patrol",
      imageUrl:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=200&fit=crop",
    },
    { id: "more-movies", label: "Get more answers", isMore: true },
  ],
  "dentist-feelings-2": [
    {
      id: "okay",
      label: "Okay",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    },
    {
      id: "happy",
      label: "Happy",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
    },
    {
      id: "nervous",
      label: "Nervous",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    },
    {
      id: "excited",
      label: "Excited",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=200&fit=crop",
    },
    {
      id: "scared",
      label: "Scared",
      imageUrl:
        "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?w=300&h=200&fit=crop",
    },
    { id: "more-feelings-2", label: "Get more answers", isMore: true },
  ],
};

export function TasteOfMatalkAI({ onBack }: PlaygroundProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Get unique categories for filter
  const categories = [
    "All",
    ...Array.from(new Set(questions.map((q) => q.category))),
  ];

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setSelectedAnswer(null);
    setShowSuccess(false);
  };

  const handleAnswerSelect = (answerId: string, isMore?: boolean) => {
    if (isMore) {
      // Simulate "more answers" functionality
      setShowSuccess(false);
      return;
    }

    setSelectedAnswer(answerId);
    setShowSuccess(true);

    // Auto-hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const resetPlayground = () => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setShowSuccess(false);
  };

  // Filter questions based on selected category
  const filteredQuestions =
    selectedFilter === "All"
      ? questions
      : questions.filter((question) => question.category === selectedFilter);

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
                  {categories.map((category) => (
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
              {filteredQuestions.map((question, index) => (
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

            {/* Tablet Mockup and Info Panel Side by Side */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tablet Mockup */}
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
                            (option, index) => (
                              <motion.button
                                key={option.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.1,
                                }}
                                onClick={() =>
                                  handleAnswerSelect(option.id, option.isMore)
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

                        {/* Success Message */}
                        {showSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-x-6 top-24 bg-green-500 text-white rounded-2xl p-6 shadow-2xl z-10"
                          >
                            <div className="text-center">
                              <div className="text-3xl mb-3">🎉</div>
                              <p className="font-semibold text-lg">
                                Great choice!
                              </p>
                              <p className="text-sm opacity-90 mt-1">
                                Ma-Talk AI is learning
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 text-lg">🧠</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          AI Learning
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Analyzes choices to personalize future options and
                          improve speed.
                        </p>
                      </div>
                    </div>
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
                          Continuous Learning
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
