import React, { useState, useRef } from "react";
import type { TileSpec, Lang } from "../../lib/playground/types";
import {
  speak,
  isSpeechSynthesisSupported,
  initializeSpeechSynthesis,
} from "../../lib/playground/tts";

interface TileProps {
  tile: TileSpec;
  language: Lang;
  composedImageUrl?: string;
  disabled?: boolean;
}

const Tile: React.FC<TileProps> = ({
  tile,
  language,
  composedImageUrl,
  disabled = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const tileRef = useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    if (disabled || isSpeaking) return;

    // Add ripple effect immediately for better UX
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 600);

    // Try to speak if supported
    if (isSpeechSynthesisSupported()) {
      try {
        setIsSpeaking(true);

        // Initialize speech synthesis on first user interaction
        await initializeSpeechSynthesis();

        const text = tile.label[language];
        console.log(`🔊 Attempting to speak: "${text}" in ${language}`);
        await speak(text, language);
        console.log(`✅ Speech completed for: "${text}"`);
      } catch (error) {
        console.error("Speech synthesis failed:", error);
        // App continues to work even if speech fails
      } finally {
        setIsSpeaking(false);
      }
    } else {
      console.log(
        "Speech synthesis not supported, showing visual feedback only"
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      ref={tileRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || isSpeaking}
      data-tile-key={tile.key}
      className={`
        tile relative flex flex-col items-center p-2 rounded-lg border-2 transition-all
        ${
          isSpeaking
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-300"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-50"
        }
        ${rippleActive ? "animate-pulse" : ""}
      `}
      style={{
        aspectRatio: "1",
        backgroundColor: tile.backgroundColor || "#f9fafb",
      }}
      aria-label={`${tile.label[language]} - Tap to speak`}
    >
      {/* Image */}
      <div className="flex-1 overflow-hidden rounded-t-lg">
        {composedImageUrl ? (
          <img
            src={composedImageUrl}
            alt={tile.label[language]}
            className="w-full h-full object-cover"
            style={{
              filter: isSpeaking ? "brightness(1.1)" : "none",
              transition: "filter 0.2s ease",
            }}
          />
        ) : (
          // Show original image as fallback while personalized version loads
          <img
            src={tile.assetPath}
            alt={tile.label[language]}
            className="w-full h-full object-cover"
            style={{
              filter: isSpeaking ? "brightness(1.1)" : "none",
              transition: "filter 0.2s ease",
            }}
          />
        )}
      </div>

      {/* Label */}
      <div className="text-center p-1 bg-white">
        <span
          className={`
            text-xs sm:text-sm md:text-base font-bold break-words block
            ${isSpeaking ? "text-blue-600" : "text-gray-900"}
          `}
        >
          {tile.label[language]}
        </span>
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
        </div>
      )}

      {/* Focus ring for accessibility */}
      <div className="absolute inset-0 rounded-lg pointer-events-none" />
    </button>
  );
};

export default Tile;
