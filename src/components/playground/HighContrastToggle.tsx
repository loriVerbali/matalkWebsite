import React from "react";

interface HighContrastToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const HighContrastToggle: React.FC<HighContrastToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Display Mode
      </label>
      <button
        onClick={() => onChange(!value)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        style={{ minHeight: "44px" }}
        aria-label={`${value ? "Disable" : "Enable"} high contrast mode`}
        title={`${value ? "Disable" : "Enable"} high contrast mode`}
      >
        <div className="flex items-center gap-2 justify-center">
          <span className="text-lg">{value ? "🔆" : "🌙"}</span>
          <span>{value ? "High Contrast" : "Normal"}</span>
        </div>
      </button>
    </div>
  );
};

export default HighContrastToggle;
