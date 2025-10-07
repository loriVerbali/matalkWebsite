import React, { useState } from "react";

interface NormalPrintButtonProps {
  disabled?: boolean;
}

const NormalPrintButton: React.FC<NormalPrintButtonProps> = ({
  disabled = false,
}) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    if (disabled || isPrinting) return;

    setIsPrinting(true);

    try {
      // Add a class to body to trigger print-only-tiles mode
      document.body.classList.add("print-tiles-only");

      // Print the current page content
      window.print();

      // Remove the class after printing
      setTimeout(() => {
        document.body.classList.remove("print-tiles-only");
      }, 1000);
    } catch (error) {
      console.error("Failed to print:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <button
      onClick={handlePrint}
      disabled={disabled || isPrinting}
      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ minHeight: "56px" }}
    >
      <div className="flex items-center gap-2">
        {isPrinting ? (
          <>
            <div className="animate-pulse">🖨️</div>
            <span>Printing...</span>
          </>
        ) : (
          <>
            <span>🖨️</span>
            <span>Print Current View</span>
          </>
        )}
      </div>
    </button>
  );
};

export default NormalPrintButton;
