import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
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

type OrgType = "" | "school" | "clinic";

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

export function ScheduleDemoModal({ isOpen, onClose }: ScheduleDemoModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [isOpening, setIsOpening] = useState(false);
  const [loadError, setLoadError] = useState(false);

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

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isFreeEmail = FREE_EMAIL_DOMAINS.includes(
    (form.email.split("@")[1] || "").toLowerCase()
  );
  const showFreeEmailNote = emailLooksValid && isFreeEmail;

  const isSchool = form.orgType === "school";
  const isClinic = form.orgType === "clinic";

  const isValid =
    !!form.firstName.trim() &&
    !!form.lastName.trim() &&
    emailLooksValid &&
    !isFreeEmail &&
    !!form.orgType &&
    !!form.orgName.trim() &&
    !!form.state.trim() &&
    (isSchool || (!!form.city.trim() && !!form.website.trim()));

  const organizationSummary = isSchool
    ? `${form.orgName} (${form.state})`
    : `${form.orgName} — ${form.city}, ${form.state} · ${form.website}`;

  const handleSubmit = async () => {
    if (!isValid || isOpening) return;
    setIsOpening(true);
    setLoadError(false);

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
          email: form.email,
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
      onClick={onClose}
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
          onClick={onClose}
          aria-label="Close schedule a demo"
          className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-2 mb-6">
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-blue-700">
            Schedule a demo
          </span>
          <h3
            id="schedule-demo-title"
            className="text-2xl sm:text-[27px] font-extrabold tracking-tight text-slate-900"
          >
            Schedule a demo
          </h3>
          <p className="text-[15px] leading-relaxed text-slate-600">
            Demos are for schools and clinics. Tell us about your organization
            and we'll open the calendar with available times.
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
            Work email
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
              className={`${fieldClasses} appearance-none cursor-pointer bg-[linear-gradient(45deg,transparent_50%,#64748b_50%),linear-gradient(135deg,#64748b_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-20px)_22px,calc(100%-15px)_22px] bg-no-repeat`}
            >
              <option value="">Select one…</option>
              <option value="school">A school or district</option>
              <option value="clinic">A clinic or private practice</option>
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
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  placeholder="California"
                  className={fieldClasses}
                />
              </label>
            </div>
          )}

          {isClinic && (
            <div className="flex flex-col gap-3">
              <label className={labelClasses}>
                Clinic name
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
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    placeholder="California"
                    className={fieldClasses}
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

          {showFreeEmailNote && (
            <p className="text-[13px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-xl">
              Please use your school or clinic email address so we can confirm
              your organization — or email{" "}
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
              We couldn't load the calendar. Please try again, or email{" "}
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
          {isOpening ? "Opening calendar…" : "See available times"}
        </button>
      </motion.div>
    </div>
  );
}
