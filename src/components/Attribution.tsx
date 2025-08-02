import { ArrowLeft } from "lucide-react";

interface AttributionProps {
  onBack: () => void;
}

export function Attribution({ onBack }: AttributionProps) {
  return (
    <div className="min-h-screen bg-lavender-50">
      {/* Header */}
      <div className="bg-white border-b border-violet-600/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-700 hover:text-violet-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Site</span>
          </button>
          <div>
            <h1 className="h1">Attribution</h1>
            <p className="lead text-slate-600 mt-2">
              Credits and acknowledgments for resources used in this project.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          
          {/* Icons & Graphics Section */}
          <section className="card">
            <h2 className="h2 mb-6">Icons & Graphics</h2>
            <div className="space-y-4">
              
              {/* Karate Icons Attribution */}
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🥋</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Karate Animated Icons</h3>
                  <p className="text-slate-600 mb-3">
                    Used in the Accessibility section of our Core Values to represent "breaking down barriers" in communication.
                  </p>
                  <a 
                    href="https://www.flaticon.com/free-animated-icons/karate" 
                    title="karate animated icons"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Karate animated icons created by Freepik - Flaticon</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Around Icons Attribution */}
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔄</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Around Icons</h3>
                  <p className="text-slate-600 mb-3">
                    Used in the About Us page to represent user-centered design and community-focused development approach.
                  </p>
                  <a 
                    href="https://www.flaticon.com/free-icons/around" 
                    title="around icons"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Around icons created by cube29 - Flaticon</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Innovation Icons Attribution */}
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Innovation Animated Icons</h3>
                  <p className="text-slate-600 mb-3">
                    Used in the Core Values section to represent innovation and forward-thinking in AAC technology development.
                  </p>
                  <a 
                    href="https://www.flaticon.com/free-animated-icons/innovation" 
                    title="innovation animated icons"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Innovation animated icons created by Freepik - Flaticon</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Community/Praise Icons Attribution */}
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎉</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Praise Animated Icons</h3>
                  <p className="text-slate-600 mb-3">
                    Used in the Community section of our Core Values to represent celebration and togetherness in communication.
                  </p>
                  <a 
                    href="https://www.flaticon.com/free-animated-icons/praise" 
                    title="praise animated icons"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Praise animated icons created by Freepik - Flaticon</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Artificial Intelligence Icons Attribution */}
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Artificial Intelligence Icons</h3>
                  <p className="text-slate-600 mb-3">
                    Used in the About Us page "What Sets Us Apart" section to represent AI-powered intelligence in AAC technology.
                  </p>
                  <a 
                    href="https://www.flaticon.com/free-icons/artificial-intelligence" 
                    title="artificial intelligence icons"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Artificial intelligence icons created by Smashicons - Flaticon</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Diversity Icons Attribution */}
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👥</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Diversity Icons</h3>
                  <p className="text-slate-600 mb-3">
                    Used in the About Us page "What Sets Us Apart" section to represent human-centered design and community diversity.
                  </p>
                  <a 
                    href="https://www.flaticon.com/free-icons/diversity" 
                    title="diversity icons"
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Diversity icons created by Freepik - Flaticon</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Fonts & Typography Section */}
          <section className="card">
            <h2 className="h2 mb-6">Fonts & Typography</h2>
            <div className="space-y-4">
              
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-semibold">Aa</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Inter Font Family</h3>
                  <p className="text-slate-600 mb-3">
                    Primary typography used throughout the website for optimal readability and modern aesthetic.
                  </p>
                  <a 
                    href="https://fonts.google.com/specimen/Inter" 
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Inter by Rasmus Andersson - Google Fonts</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Libraries & Tools Section */}
          <section className="card">
            <h2 className="h2 mb-6">Libraries & Development Tools</h2>
            <div className="space-y-4">
              
              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚛️</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">React & Ecosystem</h3>
                  <p className="text-slate-600 mb-3">
                    Built with React, TypeScript, and modern development tools for optimal performance and maintainability.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">TypeScript</span>
                    <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">Framer Motion</span>
                    <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">Lucide Icons</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-lavender-50 rounded-xl">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎨</span>
                </div>
                <div className="flex-1">
                  <h3 className="h3 text-lg mb-2">Tailwind CSS</h3>
                  <p className="text-slate-600 mb-3">
                    Utility-first CSS framework for rapid UI development with custom design tokens.
                  </p>
                  <a 
                    href="https://tailwindcss.com" 
                    className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Tailwind CSS by Tailwind Labs</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center py-8">
            <p className="text-slate-500">
              This attribution page is maintained to properly credit all resources used in the Verbali project. 
              <br />
              If you notice any missing attributions, please contact us.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}