import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { analytics } from "../utils/analytics";
// Placeholder image - replace with actual image when available
const logoImage = "/images/verbiPose.png";

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [isMobileRequestOpen, setIsMobileRequestOpen] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (homeRef.current && !homeRef.current.contains(event.target as Node)) {
        setIsHomeOpen(false);
      }
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setIsAboutOpen(false);
      }
      if (
        requestRef.current &&
        !requestRef.current.contains(event.target as Node)
      ) {
        setIsRequestOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMobileProductOpen(false);
        setIsMobileCompanyOpen(false);
        setIsMobileRequestOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mobile navigation
  const handleMobileNavigation = (destination: string) => {
    analytics.trackInteraction("Mobile Navigation", {
      destination: destination,
      navigation_type: "mobile_menu",
    });
    onNavigate(destination);
    setIsMobileMenuOpen(false);
    setIsMobileProductOpen(false);
    setIsMobileCompanyOpen(false);
    setIsMobileRequestOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto mobile-container py-3 sm:py-4">
        {/* Mobile Layout - 3 column grid */}
        <div className="md:hidden grid grid-cols-3 items-center">
          {/* Left: Mobile Menu Button */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-target p-2 text-slate-700 hover:text-violet-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                analytics.trackInteraction("Logo Click", {
                  navigation_type: "logo",
                  device: "mobile",
                });
                onNavigate("home");
              }}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer touch-target"
            >
              <span className="text-xl font-bold text-gradient tracking-wide relative">
                Verbali
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-400 rounded-full opacity-60"></div>
              </span>
              <img
                src={logoImage}
                alt="Verbali Logo"
                className="w-12 h-12 object-contain"
              />
            </button>
          </div>

          {/* Right: Empty space for balance */}
          <div></div>
        </div>

        {/* Desktop Layout - Original flex layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              analytics.trackInteraction("Logo Click", {
                navigation_type: "logo",
                device: "desktop",
              });
              onNavigate("home");
            }}
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity cursor-pointer touch-target"
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient tracking-wide relative">
              Verbali
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-400 rounded-full opacity-60"></div>
            </span>
            <img
              src={logoImage}
              alt="Verbali Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-6 lg:space-x-8">
            {/* Product Dropdown */}
            <div className="relative" ref={homeRef}>
              <button
                onClick={() => setIsHomeOpen(!isHomeOpen)}
                className="flex items-center space-x-1 text-slate-700 hover:text-violet-600 transition-colors font-medium touch-target"
              >
                <span>Product</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isHomeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isHomeOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => {
                      analytics.trackInteraction("Navigation Click", {
                        destination: "demo",
                        navigation_type: "dropdown_menu",
                        menu: "product",
                      });
                      onNavigate("demo");
                      setIsHomeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    Demo
                  </button>
                  <button
                    onClick={() => {
                      analytics.trackInteraction("Navigation Click", {
                        destination: "blog",
                        navigation_type: "dropdown_menu",
                        menu: "product",
                      });
                      onNavigate("blog");
                      setIsHomeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    Blog
                  </button>
                  <button
                    onClick={() => {
                      analytics.trackInteraction("Navigation Click", {
                        destination: "faq",
                        navigation_type: "dropdown_menu",
                        menu: "product",
                      });
                      onNavigate("faq");
                      setIsHomeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    FAQ
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                analytics.trackInteraction("Navigation Click", {
                  destination: "taste-of-matalk-ai",
                  navigation_type: "desktop_menu",
                });
                onNavigate("taste-of-matalk-ai");
              }}
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium touch-target"
            >
              Playground
            </button>
            <button
              onClick={() => {
                analytics.trackInteraction("Navigation Click", {
                  destination: "pricing",
                  navigation_type: "desktop_menu",
                });
                onNavigate("pricing");
              }}
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium touch-target"
            >
              Pricing
            </button>

            {/* Company Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center space-x-1 text-slate-700 hover:text-violet-600 transition-colors font-medium touch-target"
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate("about-us");
                      setIsAboutOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("mission");
                      setIsAboutOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("leadership");
                      setIsAboutOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    Leadership
                  </button>
                </div>
              )}
            </div>

            {/* Request a Feature Dropdown */}
            <div className="relative" ref={requestRef}>
              <button
                onClick={() => setIsRequestOpen(!isRequestOpen)}
                className="flex items-center space-x-1 text-slate-700 hover:text-violet-600 transition-colors font-medium touch-target"
              >
                <span>Future features</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isRequestOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isRequestOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate("language-request");
                      setIsRequestOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    Suggest a language
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("feature-request");
                      setIsRequestOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-violet-600 transition-colors touch-target"
                  >
                    Suggest a feature
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-lg z-50 mobile-no-overflow">
            <nav className="py-2">
              {/* Product Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                  className="mobile-nav-item w-full text-left justify-between"
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileProductOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileProductOpen && (
                  <div className="mobile-nav-submenu">
                    <button
                      onClick={() => handleMobileNavigation("demo")}
                      className="mobile-nav-item w-full text-left"
                    >
                      Demo
                    </button>
                    <button
                      onClick={() => handleMobileNavigation("blog")}
                      className="mobile-nav-item w-full text-left"
                    >
                      Blog
                    </button>
                    <button
                      onClick={() => handleMobileNavigation("faq")}
                      className="mobile-nav-item w-full text-left"
                    >
                      FAQ
                    </button>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <button
                onClick={() => handleMobileNavigation("pricing")}
                className="mobile-nav-item w-full text-left border-b border-gray-100"
              >
                Pricing
              </button>

              {/* Taste of Ma-Talk AI */}
              <button
                onClick={() => handleMobileNavigation("taste-of-matalk-ai")}
                className="mobile-nav-item w-full text-left border-b border-gray-100"
              >
                Taste of Ma-Talk AI
              </button>

              {/* Company Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                  className="mobile-nav-item w-full text-left justify-between"
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileCompanyOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileCompanyOpen && (
                  <div className="mobile-nav-submenu">
                    <button
                      onClick={() => handleMobileNavigation("about-us")}
                      className="mobile-nav-item w-full text-left"
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => handleMobileNavigation("mission")}
                      className="mobile-nav-item w-full text-left"
                    >
                      Mission
                    </button>
                    <button
                      onClick={() => handleMobileNavigation("leadership")}
                      className="mobile-nav-item w-full text-left"
                    >
                      Leadership
                    </button>
                  </div>
                )}
              </div>

              {/* Request Feature Section */}
              <div>
                <button
                  onClick={() => setIsMobileRequestOpen(!isMobileRequestOpen)}
                  className="mobile-nav-item w-full text-left justify-between"
                >
                  <span>Request a feature</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileRequestOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileRequestOpen && (
                  <div className="mobile-nav-submenu">
                    <button
                      onClick={() => handleMobileNavigation("language-request")}
                      className="mobile-nav-item w-full text-left"
                    >
                      Request a language support
                    </button>
                    <button
                      onClick={() => handleMobileNavigation("feature-request")}
                      className="mobile-nav-item w-full text-left"
                    >
                      Suggest a feature
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
