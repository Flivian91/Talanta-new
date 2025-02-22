import useFilteredTalents from "@/hooks/useFilteredTalents";
import { categories } from "../data/categories";
import CartegorySection from "../sections/CartegorySection";
import { useState } from "react";

function CategoryLayoutGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModelOpen, setModelOpen] = useState(false);

  return (
    <div>
      <div className="hidden md:block">
        <CartegorySection
          selectedCategory={selectedCategory}
          categories={categories}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="relative transition-all duration-300 flex items-center justify-between md:hidden">
        <span className="text-xs sm:text-sm md:text-base tracking-wide font-medium">
          Filter talent by:
        </span>
        <button
          onClick={() => setModelOpen(true)}
          className="flex items-center gap-2 border px-4 py-2 md:text-base sm:text-sm text-xs font-medium tracking-wide rounded border-secondary/80 bg-primary/35 hover:bg-white"
        >
          <FaFilter />
          <span>Filter</span>
        </button>
        {isModelOpen && (
          <CategoriesModel
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            categories={categories}
            onClose={() => setModelOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default CategoryLayoutGrid;
