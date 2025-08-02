import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Struggle } from "./components/Struggle";
import { Features } from "./components/Features";
import { Demo } from "./components/Demo";
import { CoreValues } from "./components/CoreValues";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Attribution } from "./components/Attribution";
import { AboutUs } from "./components/AboutUs";
import { Mission } from "./components/Mission";
import { Leadership } from "./components/Leadership";
import { FeatureRequest } from "./components/FeatureRequest";
import { LanguageRequest } from "./components/LanguageRequest";
import { FAQPage } from "./components/FAQPage";
import { WaitList } from "./components/WaitList";
import { VerbaliPrivacyPolicy } from "./components/VerbaliPrivacyPolicy";
import { MaTalkPrivacyPolicy } from "./components/MaTalkPrivacyPolicy";
import { TermsOfUse } from "./components/TermsOfUse";
import { Pricing } from "./components/Pricing";
import { Blog } from "./components/Blog";

export default function App() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showFeatureRequest, setShowFeatureRequest] = useState(false);
  const [showLanguageRequest, setShowLanguageRequest] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "pricing"
    | "about-us"
    | "mission"
    | "leadership"
    | "faq"
    | "verbali-privacy"
    | "matalk-privacy"
    | "terms-of-use"
    | "blog"
    | "attribution"
  >("home");

  // Clean up any old data formats on app start
  useEffect(() => {
    const oldKeys = ["verbali_testimonials", "verbali_testimonials_cleared"];
    let needsCleanup = false;

    oldKeys.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        needsCleanup = true;
      }
    });

    if (needsCleanup) {
      console.log("Cleaned up old testimonials data format");
    }
  }, []);

  // Scroll to top when page changes (after content renders)
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [currentPage]);

  // Handle demo section scrolling with proper timing
  const scrollToDemoSection = () => {
    // Small delay to ensure page transition is complete
    setTimeout(() => {
      const element = document.getElementById("demo");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  // Handle careers section scrolling with proper timing
  const scrollToCareersSection = () => {
    // Small delay to ensure page transition is complete
    setTimeout(() => {
      const element = document.getElementById("join-our-mission");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  // Navigation handler for both pages and modals
  const handleNavigation = (destination: string) => {
    switch (destination) {
      case "waitlist":
        setShowWaitlist(true);
        break;
      case "feature-request":
        setShowFeatureRequest(true);
        break;
      case "language-request":
        setShowLanguageRequest(true);
        break;
      case "demo":
        // Navigate to home and scroll to demo section
        setCurrentPage("home");
        if (currentPage === "home") {
          // Already on home page, just scroll
          scrollToDemoSection();
        }
        break;
      case "careers":
        // Navigate to leadership and scroll to careers section
        setCurrentPage("leadership");
        scrollToCareersSection();
        break;
      case "pricing":
      case "about-us":
      case "mission":
      case "leadership":
      case "faq":
      case "verbali-privacy":
      case "matalk-privacy":
      case "terms-of-use":
      case "blog":
      case "attribution":
        setCurrentPage(
          destination as
            | "pricing"
            | "about-us"
            | "mission"
            | "leadership"
            | "faq"
            | "verbali-privacy"
            | "matalk-privacy"
            | "terms-of-use"
            | "blog"
            | "attribution"
        );
        break;
      default:
        setCurrentPage("home");
    }
  };

  // Handle back navigation from pages
  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  // Render main content based on current page
  const renderMainContent = () => {
    switch (currentPage) {
      case "pricing":
        return <Pricing onBack={handleBackToHome} />;

      case "about-us":
        return <AboutUs onBack={handleBackToHome} />;

      case "mission":
        return <Mission onBack={handleBackToHome} />;

      case "leadership":
        return <Leadership onBack={handleBackToHome} />;

      case "faq":
        return (
          <FAQPage onBack={handleBackToHome} onNavigate={handleNavigation} />
        );

      case "verbali-privacy":
        return <VerbaliPrivacyPolicy onBack={handleBackToHome} />;

      case "matalk-privacy":
        return <MaTalkPrivacyPolicy onBack={handleBackToHome} />;

      case "terms-of-use":
        return <TermsOfUse onBack={handleBackToHome} />;

      case "blog":
        return <Blog onBack={handleBackToHome} />;

      case "attribution":
        return <Attribution onBack={handleBackToHome} />;

      case "home":
      default:
        return (
          <>
            <Hero />
            <div className="mb-8 sm:mb-0">
              <Struggle />
            </div>
            <div className="mb-8 sm:mb-0">
              <Features />
            </div>
            <div className="mb-8 sm:mb-0">
              <Demo />
            </div>
            <div className="mb-8 sm:mb-0">
              <CoreValues />
            </div>
            <div className="mb-8 sm:mb-0">
              <Testimonials />
            </div>
            <div className="mb-8 sm:mb-0">
              <FAQ onNavigate={handleNavigation} />
            </div>
            <div className="mb-8 sm:mb-0">
              <CTA />
            </div>
            <Footer onNavigate={handleNavigation} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header is always present */}
      <Header onNavigate={handleNavigation} />

      {/* Main content area */}
      <main>{renderMainContent()}</main>

      {/* Footer only shows on non-home pages if needed */}
      {currentPage !== "home" && <Footer onNavigate={handleNavigation} />}

      {/* Modal Overlays */}
      <WaitList isOpen={showWaitlist} onBack={() => setShowWaitlist(false)} />

      <FeatureRequest
        isOpen={showFeatureRequest}
        onBack={() => setShowFeatureRequest(false)}
      />

      <LanguageRequest
        isOpen={showLanguageRequest}
        onBack={() => setShowLanguageRequest(false)}
      />
    </div>
  );
}
