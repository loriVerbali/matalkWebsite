import React from "react";
import type { Category, Lang } from "../../lib/playground/types";

interface CategoryTabsProps {
  categories: Category[];
  currentCategory: Category["key"] | null;
  onCategoryChange: (category: Category["key"]) => void;
  language: Lang;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  currentCategory,
  onCategoryChange,
  language,
}) => {
  return (
    <div className="w-full mb-6 category-tabs">
      {/* Category tabs - always visible */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-gray-300 pb-4">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`
              flex flex-col items-center px-3 py-3 font-semibold text-xs border-b-2 transition-colors bg-white
              ${
                currentCategory === category.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            style={{ minHeight: "90px", minWidth: "120px" }}
          >
            {category.categoryImage && (
              <img
                src={category.categoryImage}
                alt={category.label[language]}
                className="w-12 h-12 object-contain mb-1 rounded"
              />
            )}
            <span className="text-center text-sm leading-tight font-semibold">
              {category.label[language]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
