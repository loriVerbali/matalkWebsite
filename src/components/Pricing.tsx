import { ArrowLeft, Check } from "lucide-react";
import { Button } from "./ui/button";

interface PricingProps {
  onBack: () => void;
}

export function Pricing({ onBack }: PricingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-8 -ml-4 text-slate-600 hover:text-violet-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <h1 className="h1 text-slate-900 mb-6">
            Choose Your <span className="text-gradient">Ma-Talk AI</span> Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Unlock the power of AI-driven AAC communication. Start your journey
            today with our flexible pricing options.
          </p>
          <div className="mt-6 text-center">
            <span className="bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium">
              🚀 Start your free trial today
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 7-Day Free Trial */}
          <div className="relative">
            {/* Free Trial Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                FREE TRIAL
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 pt-12 border border-emerald-200 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-50"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="h2 text-slate-900 mb-2">7-Day Free Trial</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-emerald-600">
                      FREE
                    </span>
                  </div>
                  <p className="text-slate-600">for 7 days</p>
                  <p className="text-sm text-emerald-600 font-medium mt-2">
                    Perfect for trying Verbali
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      Full access to all features
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      AI-powered AAC creation
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      Cloud sync across devices
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Customer support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Feature updates</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      window.open(
                        "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                        "_blank"
                      );
                    }}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-emerald-500/20 touch-target"
                    aria-label="Download Ma-Talk AI on the App Store"
                  >
                    <img
                      src="/images/black.svg"
                      alt="Download on the App Store"
                      className="h-12 sm:h-14 w-auto transition-all duration-200"
                    />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                        "_blank"
                      );
                    }}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-emerald-500/20 touch-target"
                    aria-label="Download Ma-Talk AI on Google Play"
                  >
                    <img
                      src="/images/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-12 sm:h-14 w-auto transition-all duration-200"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="relative">
            {/* Cancel Anytime Badge */}
            <div className="absolute -top-2 -right-2 z-10">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-2xl shadow-lg transform rotate-12">
                <div className="text-center">
                  <div className="font-bold text-sm">Cancel</div>
                  <div className="font-bold text-sm">anytime</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 pt-12 border border-slate-200 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-30"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="h2 text-slate-900 mb-4">Monthly Plan</h3>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">
                      $6.99/month for 3 months
                    </div>
                    <div className="text-orange-500 font-medium">
                      after 3 months: $29.99/month
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      Full access to all features
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      AI-powered AAC creation
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      Cloud sync across devices
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Customer support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Feature updates</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      window.open(
                        "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                        "_blank"
                      );
                    }}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                    aria-label="Download Ma-Talk AI on the App Store"
                  >
                    <img
                      src="/images/black.svg"
                      alt="Download on the App Store"
                      className="h-12 sm:h-14 w-auto transition-all duration-200"
                    />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                        "_blank"
                      );
                    }}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                    aria-label="Download Ma-Talk AI on Google Play"
                  >
                    <img
                      src="/images/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-12 sm:h-14 w-auto transition-all duration-200"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Plan - Most Popular */}
          <div className="relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-gradient-to-r from-violet-600 to-violet-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                Most Popular
              </span>
            </div>

            {/* Save Badge */}
            <div className="absolute -top-6 -right-6 z-10">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-2xl shadow-lg transform rotate-12 scale-90 sm:scale-100">
                <div className="text-center">
                  <div className="font-bold text-sm">SAVE</div>
                  <div className="font-bold text-lg">$60!</div>
                  <div className="text-xs">2 MONTHS FREE</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 pt-12 border-2 border-violet-200 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-50"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="h2 text-slate-900 mb-2">Annual Plan</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-violet-600">
                      $300
                    </span>
                    <span className="text-slate-500 ml-2">.00</span>
                  </div>
                  <p className="text-slate-600">per year</p>
                  <p className="text-sm text-violet-600 font-medium mt-2">
                    ($25/month when paid annually)
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      Full access to all features
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      AI-powered AAC creation
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">
                      Cloud sync across devices
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Customer support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-violet-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Feature updates</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      window.open(
                        "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                        "_blank"
                      );
                    }}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                    aria-label="Download Ma-Talk AI on the App Store"
                  >
                    <img
                      src="/images/black.svg"
                      alt="Download on the App Store"
                      className="h-12 sm:h-14 w-auto transition-all duration-200"
                    />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                        "_blank"
                      );
                    }}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                    aria-label="Download Ma-Talk AI on Google Play"
                  >
                    <img
                      src="/images/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-12 sm:h-14 w-auto transition-all duration-200"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="h2 text-center text-slate-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="h3 text-slate-900 mb-3">Is there a free trial?</h3>
              <p className="text-slate-700">
                Yes! We offer a <strong>7-day free trial</strong> so you can
                explore all features with no commitment. After the trial, you'll
                enjoy an
                <strong>
                  {" "}
                  introductory offer of $6.99/month for the first 3 months
                </strong>
                . You can cancel anytime during this period.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="h3 text-slate-900 mb-3">
                What's included in my subscription?
              </h3>
              <p className="text-slate-700">
                Your subscription includes unlimited AAC card creation,
                AI-powered speech processing, cloud sync across all your
                devices, and regular feature updates. Annual subscribers also
                get priority support.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="h3 text-slate-900 mb-3">
                Can I switch between plans?
              </h3>
              <p className="text-slate-700">
                Yes! You can upgrade or downgrade your plan at any time. If you
                switch from monthly to annual, you'll be credited for unused
                monthly time. Downgrades take effect at your next billing cycle.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="h3 text-slate-900 mb-3">
                What happens to my data if I cancel?
              </h3>
              <p className="text-slate-700">
                Your data remains accessible for 30 days after cancellation,
                giving you time to export your AAC cards and settings. After 30
                days, your account data is permanently deleted for your privacy.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 text-white">
            <h2 className="h2 text-white mb-4">
              Ready to Transform Communication?
            </h2>
            <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              Join thousands of families already using Verbali to enhance AAC
              communication with the power of AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Ma-Talk AI on the App Store"
              >
                <img
                  src="/images/black.svg"
                  alt="Download on the App Store"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
              <button
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.verbali.matalkai&utm_source=na_Med",
                    "_blank"
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-violet-500/20 touch-target"
                aria-label="Download Ma-Talk AI on Google Play"
              >
                <img
                  src="/images/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
