import { Struggle } from "./Struggle";
import { Features } from "./Features";
import { Demo } from "./Demo";
import { CoreValues } from "./CoreValues";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";

type HomeMidProps = {
  onNavigate: (destination: string) => void;
};

/** Below-the-fold home sections — lazy-loaded to reduce initial JS and TBT. */
export function HomeMid({ onNavigate }: HomeMidProps) {
  return (
    <>
      <div className="mb-8 sm:mb-0">
        <Struggle />
      </div>
      <div className="mb-8 sm:mb-0">
        <Features />
      </div>
      <div className="mb-8 sm:mb-0">
        <Demo onNavigate={onNavigate} />
      </div>
      <div className="mb-8 sm:mb-0">
        <CoreValues />
      </div>
      <div className="mb-8 sm:mb-0">
        <Testimonials />
      </div>
      <div className="mb-8 sm:mb-0">
        <FAQ onNavigate={onNavigate} />
      </div>
      <div className="mb-8 sm:mb-0">
        <CTA />
      </div>
    </>
  );
}
