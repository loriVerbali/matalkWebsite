import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/components/utils";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function Layout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-6YGWDDW0HD";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-6YGWDDW0HD');
    `;
    document.head.appendChild(script2);

    // Clean up GA scripts
    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img src="/assets/verbi.png" alt="Verbali Logo" className="w-10 h-10" />
            <span className="font-bold text-2xl text-gray-800">Verbali</span>
          </Link>

          {isAdmin && (
            <Button
              asChild
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link to={createPageUrl("AdminBlogPosts")}>
                <Settings className="w-4 h-4 mr-2" />
                Manage Blog
              </Link>
            </Button>
          )}
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="py-8 bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <div className="flex justify-center items-center space-x-4 mb-4 flex-wrap">
            <Link
              to={createPageUrl("TermOfUse")}
              className="hover:text-purple-600 px-2 py-1"
            >
              Terms of Use
            </Link>
            <Link
              to={createPageUrl("PrivacyPolicy")}
              className="hover:text-purple-600 px-2 py-1"
            >
              Privacy Policy (Verbali)
            </Link>
            <Link
              to={createPageUrl("MaTalkPrivacyPolicy")}
              className="hover:text-purple-600 px-2 py-1"
            >
              Privacy Policy (Ma-Talk AI)
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Verbali Inc. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Contact:{" "}
            <a href="mailto:info@verbali.io" className="hover:text-purple-600">
              info@verbali.io
            </a>{" "}
            | 12345 Parklawn Drive, Suite 200, Rockville, MD 20852
          </p>
        </div>
      </footer>
    </div>
  );
}
