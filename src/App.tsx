import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { analytics } from "./utils/analytics";
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
import { News } from "./components/News";
import { FeatureRequest } from "./components/FeatureRequest";
import { LanguageRequest } from "./components/LanguageRequest";
import { FAQPage } from "./components/FAQPage";
import { WaitList } from "./components/WaitList";
import { VerbaliPrivacyPolicy } from "./components/VerbaliPrivacyPolicy";
import { MaTalkPrivacyPolicy } from "./components/MaTalkPrivacyPolicy";
import { TermsOfUse } from "./components/TermsOfUse";
import { Pricing } from "./components/Pricing";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";
import { TasteOfMatalkAI } from "./components/TasteOfMatalkAI";
import { DataDeletion } from "./components/DataDeletion";
import HeroMe from "./components/HeroMe";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showFeatureRequest, setShowFeatureRequest] = useState(false);
  const [showLanguageRequest, setShowLanguageRequest] = useState(false);

  // Determine current page from URL path
  const getCurrentPageFromPath = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "home";
      case "/pricing":
        return "pricing";
      case "/about-us":
        return "about-us";
      case "/news":
        return "news";
      case "/mission":
        return "mission";
      case "/leadership":
        return "leadership";
      case "/faq":
        return "faq";
      case "/verbali-privacy":
        return "verbali-privacy";
      case "/matalk-privacy":
        return "matalk-privacy";
      case "/terms-of-use":
        return "terms-of-use";
      case "/blog":
        return "blog";
      case "/attribution":
        return "attribution";
      case "/taste-of-matalk-ai":
        return "taste-of-matalk-ai";
      case "/data-deletion":
        return "data-deletion";
      case "/playground":
        return "playground";
      case "/hero-me":
        return "hero-me";
      default:
        // Check if it's a blog post URL
        if (pathname.startsWith("/blog/")) {
          return "blog-post";
        }
        return "home";
    }
  };

  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "pricing"
    | "about-us"
    | "news"
    | "mission"
    | "leadership"
    | "faq"
    | "verbali-privacy"
    | "matalk-privacy"
    | "terms-of-use"
    | "blog"
    | "blog-post"
    | "attribution"
    | "taste-of-matalk-ai"
    | "data-deletion"
    | "playground"
    | "hero-me"
  >(getCurrentPageFromPath(location.pathname));

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

  // Update current page when URL changes
  useEffect(() => {
    const newPage = getCurrentPageFromPath(location.pathname);
    setCurrentPage(newPage);
  }, [location.pathname]);

  // Track page views
  useEffect(() => {
    analytics.trackPageView(currentPage, {
      page_type: currentPage,
      timestamp: new Date().toISOString(),
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
    // Track navigation events
    analytics.trackInteraction("Navigation", {
      from_page: currentPage,
      to_destination: destination,
      navigation_type: "user_click",
    });

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
        navigate("/");
        if (currentPage === "home") {
          // Already on home page, just scroll
          scrollToDemoSection();
        }
        break;
      case "careers":
        // Navigate to leadership and scroll to careers section
        navigate("/leadership");
        scrollToCareersSection();
        break;
      case "pricing":
        navigate("/pricing");
        break;
      case "about-us":
        navigate("/about-us");
        break;
      case "news":
        navigate("/news");
        break;
      case "mission":
        navigate("/mission");
        break;
      case "leadership":
        navigate("/leadership");
        break;
      case "faq":
        navigate("/faq");
        break;
      case "verbali-privacy":
        navigate("/verbali-privacy");
        break;
      case "matalk-privacy":
        navigate("/matalk-privacy");
        break;
      case "terms-of-use":
        navigate("/terms-of-use");
        break;
      case "blog":
        navigate("/blog");
        break;
      case "attribution":
        navigate("/attribution");
        break;
      case "taste-of-matalk-ai":
        navigate("/taste-of-matalk-ai");
        break;
      case "data-deletion":
        navigate("/data-deletion");
        break;
      case "playground":
        navigate("/playground");
        break;
      case "hero-me":
        navigate("/hero-me");
        break;
      default:
        navigate("/");
    }
  };

  // Handle back navigation from pages
  const handleBackToHome = () => {
    navigate("/");
  };

  // Handle back navigation to playground
  const handleBackToPlayground = () => {
    navigate("/playground");
  };

  // Render main content based on current page
  const renderMainContent = () => {
    switch (currentPage) {
      case "pricing":
        return <Pricing onBack={handleBackToHome} />;

      case "about-us":
        return <AboutUs onBack={handleBackToHome} />;

      case "news":
        return <News onBack={handleBackToHome} />;

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

      case "blog-post":
        return <BlogPost onBack={handleBackToHome} />;

      case "attribution":
        return <Attribution onBack={handleBackToHome} />;

      case "taste-of-matalk-ai":
        return <TasteOfMatalkAI onBack={handleBackToHome} />;

      case "data-deletion":
        return <DataDeletion onBack={handleBackToHome} />;

      case "playground":
        return <TasteOfMatalkAI onBack={handleBackToHome} />;

      case "hero-me":
        return <HeroMe onBack={handleBackToHome} />;

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
              <Demo onNavigate={handleNavigation} />
            </div>
            {/* <div className="mb-8 sm:mb-0">
              <TasteOfMatalkAI />
            </div> */}
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
