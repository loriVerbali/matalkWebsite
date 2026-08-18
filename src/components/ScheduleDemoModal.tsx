import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { analytics } from "../utils/analytics";
import { CALENDLY_DEMO_URL } from "../config/promo";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: Record<string, unknown>;
      }) => void;
    };
  }
}

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";
const CONTACT_API_URL =
  "https://matalkwebsitebe-production.up.railway.app/api/contact";

/**
 * Calendly's widget assets are pulled in the first time the modal opens rather
 * than from index.html, so the third-party script never costs the homepage a
 * request on first paint.
 */
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();

  if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS;
    document.head.appendChild(link);
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_JS}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("calendly")));
      return;
    }
    const script = document.createElement("script");
    script.src = CALENDLY_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("calendly"));
    document.body.appendChild(script);
  });
}

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "live.com",
  "me.com",
  "msn.com",
  "proton.me",
  "protonmail.com",
];

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Outside the U.S.",
];

type OrgType = "" | "school" | "clinic" | "family";

interface ScheduleDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  orgType: "" as OrgType,
  orgName: "",
  city: "",
  state: "",
  website: "",
};

const fieldClasses =
  "w-full text-base text-slate-900 bg-white px-4 py-3 border border-slate-300 rounded-xl min-h-[48px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400";
const labelClasses = "flex flex-col gap-1.5 text-sm font-semibold text-slate-700";
const selectClasses = `${fieldClasses} appearance-none cursor-pointer bg-[linear-gradient(45deg,transparent_50%,#64748b_50%),linear-gradient(135deg,#64748b_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-20px)_22px,calc(100%-15px)_22px] bg-no-repeat`;

function StateSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={selectClasses}
    >
      <option value="">Select a state…</option>
      {US_STATES.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
}

export function ScheduleDemoModal({ isOpen, onClose }: ScheduleDemoModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [isOpening, setIsOpening] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [webinarJoined, setWebinarJoined] = useState(false);

  // Warm the widget up while the visitor is filling the form.
  useEffect(() => {
    if (isOpen) loadCalendly().catch(() => undefined);
  }, [isOpen]);

  // Close on Escape, and don't let the page scroll behind the modal.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const set = (field: keyof typeof emptyForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Trim before validating — mobile autofill often appends a stray space,
  // which would otherwise fail the format check and lock the submit button.
  const email = form.email.trim();
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFreeEmail = FREE_EMAIL_DOMAINS.includes(
    (email.split("@")[1] || "").toLowerCase()
  );

  const isSchool = form.orgType === "school";
  const isClinic = form.orgType === "clinic";
  const isFamily = form.orgType === "family";

  // Families sign up with whatever email they have; the work-email rule only
  // applies to organizations we need to verify.
  const showFreeEmailNote = emailLooksValid && isFreeEmail && !isFamily;

  const isValid =
    !!form.firstName.trim() &&
    !!form.lastName.trim() &&
    emailLooksValid &&
    !!form.orgType &&
    !!form.state.trim() &&
    (isFamily ||
      (!isFreeEmail &&
        !!form.orgName.trim() &&
        (isSchool || (!!form.city.trim() && !!form.website.trim()))));

  const organizationSummary = isSchool
    ? `${form.orgName} (${form.state})`
    : `${form.orgName} — ${form.city}, ${form.state} · ${form.website}`;

  const handleClose = () => {
    if (webinarJoined) {
      setForm(emptyForm);
      setWebinarJoined(false);
    }
    onClose();
  };

  const handleSubmit = async () => {
    if (!isValid || isOpening) return;
    setIsOpening(true);
    setLoadError(false);

    if (isFamily) {
      analytics.trackFormSubmission("Family Webinar List", true, {
        state: form.state,
      });
      try {
        const response = await fetch(CONTACT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            source: "family-webinar-list",
            name: `${form.firstName} ${form.lastName}`.trim(),
            state: form.state,
          }),
        });
        if (!response.ok) throw new Error("webinar-list");
        setWebinarJoined(true);
      } catch {
        setLoadError(true);
      } finally {
        setIsOpening(false);
      }
      return;
    }

    analytics.trackFormSubmission("Schedule a Demo", true, {
      org_type: form.orgType,
      organization: form.orgName,
      state: form.state,
    });

    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({
        url: CALENDLY_DEMO_URL,
        prefill: {
          firstName: form.firstName,
          lastName: form.lastName,
          name: `${form.firstName} ${form.lastName}`.trim(),
          email,
          customAnswers: { a1: organizationSummary },
        },
      });
      setForm(emptyForm);
      onClose();
    } catch {
      setLoadError(true);
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[88vh] overflow-y-auto p-8 sm:p-9"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-demo-title"
      >
        <button
          onClick={handleClose}
          aria-label="Close schedule a demo"
          className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {webinarJoined ? (
          <div className="flex flex-col items-center text-center gap-4 py-8">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
              You're on the list!
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-600 max-w-sm">
              We'll email you an invitation to our next family walkthrough. In
              the meantime, the <strong>7-day free trial</strong> is open now —
              no credit card needed.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-bold text-base px-8 py-3 rounded-xl min-h-[48px]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-blue-700">
                For schools, clinics &amp; consultants
              </span>
              <h3
                id="schedule-demo-title"
                className="text-2xl sm:text-[27px] font-extrabold tracking-tight text-slate-900"
              >
                Schedule a demo
              </h3>
              <p className="text-[15px] leading-relaxed text-slate-600">
                Schools, clinics and AAC consultants get a one-on-one demo.
                Families can join the list for our next live webinar.
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={labelClasses}>
                  First name
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Alex"
                    className={fieldClasses}
                  />
                </label>
                <label className={labelClasses}>
                  Last name
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Rivera"
                    className={fieldClasses}
                  />
                </label>
              </div>

              <label className={labelClasses}>
                {isFamily ? "Your email" : "Work email"}
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="alex@district.org"
                  className={fieldClasses}
                />
              </label>

              <label className={labelClasses}>
                I'm booking on behalf of
                <select
                  value={form.orgType}
                  onChange={(e) => {
                    // Switching type clears the fields that belong to the other branch.
                    setForm((prev) => ({
                      ...prev,
                      orgType: e.target.value as OrgType,
                      orgName: "",
                      city: "",
                      state: "",
                      website: "",
                    }));
                  }}
                  className={selectClasses}
                >
                  <option value="">Select one…</option>
                  <option value="school">A school or district</option>
                  <option value="clinic">
                    A clinic, private practice or AAC consultant
                  </option>
                  <option value="family">A family or individual</option>
                </select>
              </label>

              {isSchool && (
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>
                    School or district name
                    <input
                      type="text"
                      value={form.orgName}
                      onChange={(e) => set("orgName", e.target.value)}
                      placeholder="Riverside Unified"
                      className={fieldClasses}
                    />
                  </label>
                  <label className={labelClasses}>
                    State
                    <StateSelect
                      value={form.state}
                      onChange={(value) => set("state", value)}
                    />
                  </label>
                </div>
              )}

              {isClinic && (
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>
                    Clinic or practice name
                    <input
                      type="text"
                      value={form.orgName}
                      onChange={(e) => set("orgName", e.target.value)}
                      placeholder="Bayside Speech Therapy"
                      className={fieldClasses}
                    />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={labelClasses}>
                      City
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        placeholder="Oakland"
                        className={fieldClasses}
                      />
                    </label>
                    <label className={labelClasses}>
                      State
                      <StateSelect
                        value={form.state}
                        onChange={(value) => set("state", value)}
                      />
                    </label>
                  </div>
                  <label className={labelClasses}>
                    Website
                    <input
                      type="text"
                      value={form.website}
                      onChange={(e) => set("website", e.target.value)}
                      placeholder="baysidespeech.com"
                      className={fieldClasses}
                    />
                  </label>
                </div>
              )}

              {isFamily && (
                <div className="flex flex-col gap-3.5">
                  <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3.5">
                    <p className="text-sm font-bold text-violet-700 mb-1.5">
                      Join our next family walkthrough
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      We run live sessions for families, where we walk through
                      MaTalk AI and answer your questions — and you'll hear how
                      other parents are using it. Join the list and we'll send
                      you an invitation to the next one. You don't have to wait
                      to start: the <strong>7-day free trial</strong> is open
                      now, no credit card needed.
                    </p>
                  </div>
                  <label className={labelClasses}>
                    <span>
                      Where are you?
                      <span className="block font-normal text-slate-500">
                        (so we can pick a good time zone)
                      </span>
                    </span>
                    <StateSelect
                      value={form.state}
                      onChange={(value) => set("state", value)}
                    />
                  </label>
                </div>
              )}

              {showFreeEmailNote && (
                <p className="text-[13px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-xl">
                  Please use your school or clinic email address so we can
                  confirm your organization — or email{" "}
                  <a
                    href="mailto:info@verbali.io?subject=Demo%20request"
                    className="font-semibold underline"
                  >
                    info@verbali.io
                  </a>{" "}
                  and we'll book you directly.
                </p>
              )}

              {loadError && (
                <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 px-3 py-2.5 rounded-xl">
                  {isFamily
                    ? "Something went wrong joining the list. Please try again, or email "
                    : "We couldn't load the calendar. Please try again, or email "}
                  <a
                    href="mailto:info@verbali.io?subject=Demo%20request"
                    className="font-semibold underline"
                  >
                    info@verbali.io
                  </a>
                  .
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isValid || isOpening}
              className={`mt-6 w-full flex items-center justify-center text-white font-bold text-base py-3.5 rounded-xl min-h-[48px] transition-all ${
                isValid && !isOpening
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 cursor-pointer"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {isOpening
                ? isFamily
                  ? "Joining…"
                  : "Opening calendar…"
                : isFamily
                  ? "Join the webinar list"
                  : "See available times"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
