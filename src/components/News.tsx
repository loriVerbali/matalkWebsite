import { ArrowLeft, Check, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NewsProps {
  onBack: () => void;
}

interface ShareLinkProps {
  id: string;
  copiedId: string | null;
  onCopy: (id: string) => void;
}

function ShareLink({ id, copiedId, onCopy }: ShareLinkProps) {
  const copied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(id)}
      className="inline-flex items-center space-x-1 text-slate-400 hover:text-violet-600 transition-colors"
      aria-label="Copy link to this update"
      title="Copy link to this update"
    >
      {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      {copied && <span className="text-xs font-medium">Copied!</span>}
    </button>
  );
}

export function News({ onBack }: NewsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopy = (id: string) => {
    const url = `${window.location.origin}/news#${id}`;
    navigator.clipboard.writeText(url);
    window.history.replaceState(null, "", `/news#${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="davoice-on-device"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-violet-600 mb-0">
                July 2026
              </p>
              <ShareLink
                id="davoice-on-device"
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            </div>
            <h2 className="h2 mb-6">
              All speech processing now runs fully on-device with DaVoice
            </h2>
            <p className="text-slate-600 mb-6">
              We have moved our speech-to-text and text-to-speech engines to run
              entirely on-device using{" "}
              <a
                href="https://davoice.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                DaVoice
              </a>
              . Nothing your child says ever leaves the tablet — no audio is
              sent to the cloud, and speech recognition and voice output keep
              working even without an internet connection. Here is the story of
              how we got there.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Our search for an on-device voice solution
            </h3>
            <p className="text-slate-600 mb-6">
              As part of the MaTalk AI experience, we wanted to allow children
              to activate the app hands-free using a custom wake word: "Hey
              Verbi." An always-listening AAC experience has to react instantly
              without misfiring — false positives disrupt the very conversation
              the app is meant to support. We evaluated a number of wake word
              technologies before selecting DaVoice, which consistently
              delivered the best combination of accuracy, reliability, and
              on-device performance — even in noisy environments. Here is what
              we measured on our own setup:
            </p>
            <div className="bg-slate-50 rounded-xl p-5 mb-4">
              <p className="text-sm font-medium text-slate-900 mb-4">
                Wake word detection accuracy (Verbali's test setup)
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">DaVoice</span>
                    <span className="font-medium text-slate-900">
                      97.65% — zero false positives observed
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{ width: "97.65%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">
                      Other commercial engines we evaluated
                    </span>
                    <span className="font-medium text-slate-900">~75%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 mb-0">
                Figures are from our own testing on our setup. Every engine we
                tested other than DaVoice had false-positive rates too high for
                production use.
              </p>
            </div>
            <p className="text-slate-600 mb-6">
              We knew we'd made the right choice, but it really hit home
              watching it perform live in a very noisy exhibition hall at ATIA
              2026 without missing a single wake word.
            </p>
            <p className="text-slate-600 mb-6">
              At the time, we knew DaVoice as a wake word provider. We did not
              realize that the platform also included lightweight,
              high-performance on-device speech-to-text and text-to-speech. Our
              existing implementation still relied on local speech-to-text and
              text-to-speech engines that were robotic in sound and heavy.
              While this allowed
              voice interactions to be processed directly on the device, it also
              presented several challenges. Users were required to download an
              additional speech model during onboarding — even the smallest
              model required approximately 70 MB, while larger models could add
              close to half a gigabyte to the app. The larger models could
              improve recognition, but they also increased download times,
              storage requirements, and the overall size and complexity of the
              application.
            </p>
            <p className="text-slate-600 mb-6">
              After discovering DaVoice's complete voice stack, we decided to
              benchmark its speech-to-text and text-to-speech against our
              existing solution.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Expanding our use of DaVoice
            </h3>
            <p className="text-slate-600 mb-6">
              The benchmark results exceeded our expectations. After originally
              choosing DaVoice for wake word detection, we decided to migrate
              our speech-to-text and text-to-speech to the same platform. The
              difference has been significant. DaVoice provides a lightweight
              engine for both on-device speech-to-text and text-to-speech. Its
              technology is easier to integrate and maintain, requires less
              storage, and delivers a faster and smoother experience for MaTalk
              AI users.
            </p>
            <p className="text-slate-600 mb-6">
              We have no affiliation with DaVoice beyond being a happy customer
              — if you are building anything voice-activated, we can genuinely
              recommend them. Learn more at{" "}
              <a
                href="https://davoice.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                https://davoice.io
              </a>
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

          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="cornell-tech"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-violet-600 mb-0">
                    May 2026
                  </p>
                  <ShareLink
                    id="cornell-tech"
                    copiedId={copiedId}
                    onCopy={handleCopy}
                  />
                </div>
                <h2 className="h2 mb-6">
                  Verbali Collaboration with Cornell Tech
                </h2>
                <p className="text-slate-600 mb-6">
                  Verbali is proud to announce that we are working with
                  researchers from{" "}
                  <a
                    href="https://tech.cornell.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Cornell Tech
                  </a>{" "}
                  to advance the future of AI-powered AAC solutions.
                </p>
                <p className="text-slate-600 mb-6">
                  We are specifically collaborating with{" "}
                  <a
                    href="https://www.linkedin.com/in/tobias-weinberg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Tobias Weinberg
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.linkedin.com/in/thijsroumen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Thijs Roumen
                  </a>{" "}
                  to push the boundaries of natural and accessible
                  communication for non-verbal children.
                </p>
                <p className="text-slate-600 mb-6">
                  Check out Cornell Tech for more information.
                  <br />
                  <a
                    href="https://tech.cornell.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    https://tech.cornell.edu/
                  </a>
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
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end shrink-0">
                <img
                  src="/images/partners/cornellTech.png"
                  alt="Cornell Tech Logo"
                  className="max-h-32 w-auto object-contain bg-white p-4 rounded-xl shadow-sm border border-slate-100"
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="ablenet"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-violet-600 mb-0">
                March 2026
              </p>
              <ShareLink id="ablenet" copiedId={copiedId} onCopy={handleCopy} />
            </div>
            <h2 className="h2 mb-6">
              Verbali is partnering with Ablenet to bring the power of AI to the
              classroom
            </h2>
            <p className="text-slate-600 mb-6">
              Verbali is partnering with Ablenet to bring the power of AI to the
              classroom. MaTalk AI Forever is now available from AbleNet on the
              QuickTalker Freestyle speech device! Start a{" "}
              <a
                href="https://quicktalkerfreestyle.com/client-information-form-slp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                benefit check
              </a>{" "}
              to make your request.
              <br />
              Matalk AI Forever is competitively priced at $200.00 <br />
              You can download it from the App Store.
              <br />
              <br />
              <button
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/za/app/matalk-ai-forever/id6756188044",
                    "_blank",
                  );
                }}
                className="group transition-all duration-200 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-4 focus:ring-blue-500/20 touch-target"
                aria-label="Download Matalk AI Forever on the App Store"
              >
                <img
                  src="/images/black.svg"
                  alt="Download on the App Store"
                  className="h-12 sm:h-14 w-auto transition-all duration-200"
                />
              </button>
              <br />
              <br />
              <p>Check out AbleNet's website for more information.</p>
              <a
                href="https://www.ablenetinc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                https://www.ablenetinc.com/
              </a>
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

          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="profile-export"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-violet-600 mb-0">
                Feb 2026
              </p>
              <ShareLink
                id="profile-export"
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            </div>
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

          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            id="davoice-wake-word"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-violet-600 mb-0">
                January 2026
              </p>
              <ShareLink
                id="davoice-wake-word"
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            </div>
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
          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            id="atia-2026"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-violet-600 mb-0">
                Dec 2025
              </p>
              <ShareLink
                id="atia-2026"
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            </div>
            <h2 className="h2 mb-6">
              Verbali is going to ATIA 2026 in Orlando, Florida
            </h2>
            <p className="text-slate-600 mb-6">
              Verbali is proud to be a part of ATIA 2026 in Orlando, Florida. We
              will be showcasing our products and services to the public at
              booth 811. We are excited to be part of this journey and to help
              shape the future of AAC. Come visit us at booth 811 to learn more
              about our products and services.
            </p>
          </motion.section>
          <motion.section
            className="card scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            id="verbalitalk"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-violet-600 mb-0">
                Oct 2025
              </p>
              <ShareLink
                id="verbalitalk"
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            </div>
            <h2 className="h2 mb-6">
              Verbali Launches a sister product named: VerbaliTalk
            </h2>
            <p className="text-slate-600 mb-6">
              Verbali is proud to launch our a sister product named VerbaliTalk
              as part of our offering . While we are focused on building the
              future of AAC, we decided to launch a product focused on literate
              AAC users. VerbaliTalk is the same product as Matalk AI but with a
              focus on literate AAC users. There are less images and more text .
              Our Keyboard still has the optional AI polish feature You can
              download it from the App Store for a flat fee of $200 . It
              includes all features of Matalk AI.
              <a
                href="https://apps.apple.com/ua/app/verbalitalk-forever/id6756187971"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                VERBALI TALK on the App Store
              </a>
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
