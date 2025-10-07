import React from "react";
import type { Lang } from "../../lib/playground/types";

interface LanguageSelectorProps {
  value: Lang;
  onChange: (lang: Lang) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const languages: { value: Lang; label: string; flag: string }[] = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "pt", label: "Português", flag: "🇧🇷" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Language / Idioma / Idioma
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Lang)}
        disabled={disabled}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ minHeight: "44px" }}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
