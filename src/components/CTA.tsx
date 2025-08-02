interface CTAProps {
  onNavigate?: (page: "waitlist") => void;
}

export function CTA({ onNavigate }: CTAProps = {}) {
  return (
    <section className="py-20 bg-gradient-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="h2 mb-6 text-white">
            Ready to Experience the Future of AAC?
          </h2>
          <p className="lead opacity-90 mb-8">
            Join the waitlist for early access to Verbali and be part of the
            revolution in augmentative and alternative communication.
          </p>
          <div className="flex justify-center items-center">
            <a
              href="https://apps.apple.com/app/ma-talk-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-200 hover:scale-105"
            >
              {/* <img
                src={appStoreButton}
                alt="Download on the App Store"
                className="h-14 w-auto transition-all duration-200"
              /> */}
            </a>
          </div>
          <p className="caption opacity-75 mt-6">
            Launching in 2025 • Early access • Priority support
          </p>
        </div>
      </div>
    </section>
  );
}
