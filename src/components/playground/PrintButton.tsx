import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { Category } from "../../lib/playground/types";

interface PrintButtonProps {
  categories?: Category[]; // Made optional since we're not using it anymore
  composedTiles?: Map<string, Blob>; // Made optional since we're not using it anymore
  composedUrls?: Map<string, string>; // Made optional since we're not using it anymore
  disabled?: boolean;
}

const PrintButton: React.FC<PrintButtonProps> = ({
  categories = [],
  composedTiles,
  composedUrls,
  disabled = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "MaTalk Feelings Collage",
    contentRef: printRef,
  });

  return (
    <>
      {/* Print content - always rendered */}
      <div ref={printRef} className="print-content">
        {categories.map((category, index) => (
          <div key={category.key} className="print-page">
            <div className="print-header">
              <h1>MaTalk Feelings Reference</h1>
              <p>Communication board for expressing feelings and emotions</p>
            </div>
            <div className="print-category-title">
              <h2>{category.label.en}</h2>
            </div>
            <div className="print-grid">
              {category.tiles.map((tile) => {
                const composedUrl = composedUrls?.get(tile.key);

                // Use composed image if available, otherwise use original
                const imageSrc = composedUrl || tile.assetPath;

                return (
                  <div key={tile.key} className="print-tile">
                    <div className="print-tile-image">
                      <img src={imageSrc} alt={tile.label.en} />
                    </div>
                    <div className="print-tile-label">
                      <span>{tile.label.en}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrint}
        disabled={disabled || isGenerating}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ minHeight: "56px" }}
      >
        <div className="flex items-center gap-2">
          {isGenerating ? (
            <>
              <div className="animate-pulse">🖨️</div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>🖨️</span>
              <span>Print Collage</span>
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default PrintButton;
