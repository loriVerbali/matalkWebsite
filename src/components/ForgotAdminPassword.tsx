import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface ForgotAdminPasswordProps {
  onBack: () => void;
}

const NUMBER_WORDS: Record<number, string> = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

export function ForgotAdminPassword({ onBack }: ForgotAdminPasswordProps) {
  const [targetNumbers, setTargetNumbers] = useState<number[]>([]);
  const [inputNumbers, setInputNumbers] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  const generateNumbers = () => {
    const nums: number[] = [];
    while (nums.length < 4) {
      const r = Math.floor(Math.random() * 10);
      if (!nums.includes(r)) {
        nums.push(r);
      }
    }
    setTargetNumbers(nums);
    setInputNumbers([]);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const handleNumberClick = (num: number) => {
    if (isUnlocked) return;

    const newInput = [...inputNumbers, num];
    setInputNumbers(newInput);

    // Check if the input so far is correct
    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] !== targetNumbers[i]) {
        // Wrong input, shake and reset
        setShake(true);
        setTimeout(() => {
          setShake(false);
          generateNumbers();
        }, 500);
        return;
      }
    }

    // If completely correct
    if (newInput.length === 4) {
      setTimeout(() => {
        setIsUnlocked(true);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-12 flex flex-col items-center">
      <div className="max-w-md w-full mx-auto px-4 mt-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 -ml-4 text-slate-600 hover:text-violet-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div
          className={`bg-white rounded-3xl shadow-xl p-8 border border-slate-200 text-center transition-transform ${shake ? "animate-shake" : ""}`}
        >
          {!isUnlocked ? (
            <div className="py-4">
              <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Parental Control
              </h1>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Tap on the numbers{" "}
                <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  {targetNumbers.map((n) => NUMBER_WORDS[n]).join(", ")}
                </span>
                .
              </p>

              {/* Input indicators */}
              <div className="flex justify-center gap-4 mb-8">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-colors duration-300 shadow-inner ${
                        i < inputNumbers.length
                          ? "bg-indigo-600 shadow-indigo-400"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className="aspect-square bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 rounded-2xl text-2xl font-semibold text-slate-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-95 shadow-sm"
                  >
                    {num}
                  </button>
                ))}
                <div className="col-start-2">
                  <button
                    onClick={() => handleNumberClick(0)}
                    className="w-full aspect-square bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 rounded-2xl text-2xl font-semibold text-slate-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-95 shadow-sm"
                  >
                    0
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 min-h-[400px] flex flex-col justify-center animate-in fade-in zoom-in duration-500">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Admin Code
              </h2>
              <div className="text-7xl font-black text-black tracking-widest my-8 px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner inline-block mx-auto">
                7856
              </div>
              <p className="text-slate-600 mb-10 text-lg">
                This is to open the settings and board area in the app.
              </p>

              <div className="flex flex-col gap-5 items-center">
                <button
                  onClick={() => {
                    window.open(
                      "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                      "_blank",
                    );
                  }}
                  className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-indigo-500/20 touch-target"
                  aria-label="Download Matalk AI on the App Store"
                >
                  <img
                    src="/images/black.svg"
                    alt="Download on the App Store"
                    className="h-14 lg:h-16 w-auto"
                  />
                </button>
                <button
                  onClick={() => {
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                      "_blank",
                    );
                  }}
                  className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-indigo-500/20 touch-target"
                  aria-label="Download Matalk AI on Google Play"
                >
                  <img
                    src="/images/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-14 lg:h-16 w-auto"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
