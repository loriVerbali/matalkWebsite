import { analytics } from "../utils/analytics";

// Placeholder image - replace with actual image when available
const logoImage = "/images/verbiPose.png";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  // Handle Contact Us - opens email client
  const handleContactUs = () => {
    analytics.trackInteraction("Contact Email Click", {
      email_type: "info",
      destination: "mailto:info@verbali.io",
    });
    window.location.href =
      "mailto:info@verbali.io?subject=Contact%20Verbali&body=Hello%20Verbali%20team,%0A%0A";
  };

  return (
    <footer className="bg-white border-t border-violet-600/10">
      <div className="max-w-7xl mx-auto mobile-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {/* Company Info - More compact on mobile */}
          <div className="col-span-2 md:col-span-1 mb-4 sm:mb-0">
            <button
              onClick={() => {
                analytics.trackInteraction("Footer Logo Click", {
                  navigation_type: "footer_logo",
                });
                onNavigate("home");
              }}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer mb-2 sm:mb-4 touch-target"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gradient tracking-wide relative">
                Verbali
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-400 rounded-full opacity-60"></div>
              </span>
              <img
                src={logoImage}
                alt="Verbali Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
              />
            </button>
            <p className="text-slate-700 text-sm sm:text-base hidden sm:block mb-4">
              AI-powered Augmentative and Alternative Communication (AAC)
              system.
            </p>
            <p className="text-slate-700 text-xs sm:hidden mb-2">
              AI-powered AAC system.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-3 mb-4">
              <a
                href="https://www.linkedin.com/company/verbali-ai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.trackInteraction("Social Media Click", {
                    platform: "linkedin",
                    destination: "company_page",
                  });
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </a>
              <a
                href="https://www.facebook.com/verbaliAI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.trackInteraction("Social Media Click", {
                    platform: "facebook",
                    destination: "company_page",
                  });
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/facebook.png"
                  alt="Facebook"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </a>
              <a
                href="https://x.com/verbaliAI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.trackInteraction("Social Media Click", {
                    platform: "twitter",
                    destination: "company_page",
                  });
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/x.png"
                  alt="Twitter/X"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </a>
              <a
                href="https://www.youtube.com/@Verbali-AI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.trackInteraction("Social Media Click", {
                    platform: "youtube",
                    destination: "company_channel",
                  });
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/youtube.svg"
                  alt="YouTube"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </a>
            </div>

            {/* Product Hunt Badge */}
            <div className="mt-4">
              <a
                href="https://www.producthunt.com/products/verbali-presents-when-ai-meets-aac?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-verbali&#0045;presents&#0045;when&#0045;ai&#0045;meets&#0045;aac"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.trackInteraction("Social Media Click", {
                    platform: "producthunt",
                    destination: "product_page",
                  });
                }}
                className="hover:opacity-80 transition-opacity inline-block"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1039820&theme=light&t=1763526214879"
                  alt="Verbali&#0032;presents&#0058;&#0032;when&#0032;AI&#0032;meets&#0032;AAC - Verbali&#0032;is&#0032;using&#0032;AI&#0032;to&#0032;help&#0032;non&#0045;verbal&#0032;kids&#0032;speak&#0032;in&#0032;seconds | Product Hunt"
                  style={{ width: "250px", height: "54px" }}
                  width="250"
                  height="54"
                />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 sm:mb-4 text-sm sm:text-base">
              Product
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-slate-700">
              <li>
                <button
                  onClick={() => {
                    analytics.trackInteraction("Footer Navigation", {
                      destination: "demo",
                      section: "product",
                    });
                    onNavigate("demo");
                  }}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.trackInteraction("Footer Navigation", {
                      destination: "blog",
                      section: "product",
                    });
                    onNavigate("blog");
                  }}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.trackInteraction("Footer Navigation", {
                      destination: "faq",
                      section: "product",
                    });
                    onNavigate("faq");
                  }}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.trackInteraction("Footer Navigation", {
                      destination: "pricing",
                      section: "product",
                    });
                    onNavigate("pricing");
                  }}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 sm:mb-4 text-sm sm:text-base">
              Company
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-slate-700">
              <li>
                <button
                  onClick={() => onNavigate("about-us")}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("mission")}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("leadership")}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Leadership
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 sm:mb-4 text-sm sm:text-base">
              Resources
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-slate-700">
              {/* <li>
                <button
                  onClick={() => onNavigate("careers")}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Careers
                </button>
              </li> */}
              <li>
                <button
                  onClick={handleContactUs}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Contact Us @ info@verbali.io
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("attribution")}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Attribution
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.trackInteraction("Footer Navigation", {
                      destination: "data-deletion",
                      section: "resources",
                    });
                    onNavigate("data-deletion");
                  }}
                  className="hover:text-violet-600 transition-colors text-left w-full text-sm sm:text-base min-h-[44px] flex items-center justify-start"
                >
                  Delete My Data
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-600/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="caption text-slate-500">
            © 2026 Verbali. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mt-4 md:mt-0">
            <button
              onClick={() => onNavigate("verbali-privacy")}
              className="caption text-slate-500 hover:text-violet-600 transition-colors text-left min-h-[44px] flex items-center justify-start"
            >
              Verbali Privacy Policy
            </button>
            <button
              onClick={() => onNavigate("matalk-privacy")}
              className="caption text-slate-500 hover:text-violet-600 transition-colors text-left min-h-[44px] flex items-center justify-start"
            >
              Matalk AI Privacy Policy
            </button>
            <button
              onClick={() => onNavigate("terms-of-use")}
              className="caption text-slate-500 hover:text-violet-600 transition-colors text-left min-h-[44px] flex items-center justify-start"
            >
              Terms of Use
            </button>
            <button
              onClick={() => {
                analytics.trackInteraction("Footer Navigation", {
                  destination: "data-deletion",
                  section: "legal_footer",
                });
                onNavigate("data-deletion");
              }}
              className="caption text-slate-500 hover:text-violet-600 transition-colors text-left min-h-[44px] flex items-center justify-start"
            >
              Delete My Data
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
