import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import faqPageStructuredData from "./data/faq-page-schema.json";
import { analytics } from "./utils/analytics";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FeatureRequest } from "./components/FeatureRequest";
import { LanguageRequest } from "./components/LanguageRequest";
import { WaitList } from "./components/WaitList";
import { StructuredData } from "./components/StructuredData";

const HomeMid = lazy(() =>
  import("./components/HomeMid").then((m) => ({ default: m.HomeMid }))
);
const Pricing = lazy(() =>
  import("./components/Pricing").then((m) => ({ default: m.Pricing }))
);
const AboutUs = lazy(() =>
  import("./components/AboutUs").then((m) => ({ default: m.AboutUs }))
);
const News = lazy(() =>
  import("./components/News").then((m) => ({ default: m.News }))
);
const Mission = lazy(() =>
  import("./components/Mission").then((m) => ({ default: m.Mission }))
);
const Leadership = lazy(() =>
  import("./components/Leadership").then((m) => ({ default: m.Leadership }))
);
const FAQPage = lazy(() =>
  import("./components/FAQPage").then((m) => ({ default: m.FAQPage }))
);
const VerbaliPrivacyPolicy = lazy(() =>
  import("./components/VerbaliPrivacyPolicy").then((m) => ({
    default: m.VerbaliPrivacyPolicy,
  }))
);
const MaTalkPrivacyPolicy = lazy(() =>
  import("./components/MaTalkPrivacyPolicy").then((m) => ({
    default: m.MaTalkPrivacyPolicy,
  }))
);
const TermsOfUse = lazy(() =>
  import("./components/TermsOfUse").then((m) => ({ default: m.TermsOfUse }))
);
const Blog = lazy(() =>
  import("./components/Blog").then((m) => ({ default: m.Blog }))
);
const BlogPost = lazy(() =>
  import("./components/BlogPost").then((m) => ({ default: m.BlogPost }))
);
const Attribution = lazy(() =>
  import("./components/Attribution").then((m) => ({ default: m.Attribution }))
);
const TasteOfMatalkAI = lazy(() =>
  import("./components/TasteOfMatalkAI").then((m) => ({
    default: m.TasteOfMatalkAI,
  }))
);
const DataDeletion = lazy(() =>
  import("./components/DataDeletion").then((m) => ({
    default: m.DataDeletion,
  }))
);
const ForgotAdminPassword = lazy(() =>
  import("./components/ForgotAdminPassword").then((m) => ({
    default: m.ForgotAdminPassword,
  }))
);
const HeroMe = lazy(() => import("./components/HeroMe"));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showFeatureRequest, setShowFeatureRequest] = useState(false);
  const [showLanguageRequest, setShowLanguageRequest] = useState(false);

  // --- Structured Data Schemas ---
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Verbali.io",
    "url": "https://verbali.io",
    "logo": "https://verbali.io/logo.png",
    "sameAs": [
      "https://twitter.com/VerbaliIO",
      "https://linkedin.com/company/verbali"
    ]
  };

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Maya Patel",
    "jobTitle": "Chief AI Scientist",
    "affiliation": {
      "@type": "Organization",
      "name": "Verbali.io"
    },
    "url": "https://verbali.io/about"
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MaTalk AI",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI-powered AAC app helping non-verbal children build sentences in seconds.",
    offers: [
      {
        "@type": "Offer",
        price: "5.00",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        price: "200.00",
        priceCurrency: "USD",
      },
    ],
    url: "https://verbali.io",
    downloadUrl:
      "https://apps.apple.com/us/app/ma-talk-ai/id6747360381",
    author: {
      "@type": "Organization",
      name: "Verbali",
    },
  };

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
      case "/forgotadminpassword":
        return "forgot-admin-password";
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
    | "forgot-admin-password"
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

  // Track page views after idle to keep main thread free for first paint (mobile TBT).
  useEffect(() => {
    const payload = {
      page_type: currentPage,
      timestamp: new Date().toISOString(),
    };
    const run = () => analytics.trackPageView(currentPage, payload);
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(run, { timeout: 4000 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(run, 2000);
    return () => window.clearTimeout(timeoutId);
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

      case "forgot-admin-password":
        return <ForgotAdminPassword onBack={handleBackToHome} />;

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
            <HomeMid onNavigate={handleNavigation} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header is always present */}
      <Header onNavigate={handleNavigation} />

      {currentPage === "home" && (
        <nav aria-label="Site directory" className="sr-only">
          <ul>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/blog">Resources — Blog</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/mission">Mission</Link>
            </li>
            <li>
              <Link to="/leadership">Leadership</Link>
            </li>
            <li>
              <Link to="/playground">Playground</Link>
            </li>
            <li>
              <Link to="/matalk-privacy">MaTalk AI privacy policy</Link>
            </li>
            <li>
              <Link to="/verbali-privacy">Verbali privacy policy</Link>
            </li>
            <li>
              <Link to="/terms-of-use">Terms of use</Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Structured Data for SEO */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={authorSchema} />
      {currentPage === "faq" && (
        <StructuredData data={faqPageStructuredData as object} />
      )}
      {(currentPage === "home" || currentPage === "pricing") && (
        <StructuredData data={softwareApplicationSchema} />
      )}

      {/* Main content area */}
      <main>
        <Suspense fallback={null}>{renderMainContent()}</Suspense>
      </main>

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
