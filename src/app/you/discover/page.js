"use client";

import VideoCard from "@/components/cards/VideoCard";
import { categories } from "@/components/data/categories";
import { allTalents } from "@/components/data/talents";
import CategoriesModel from "@/components/models/CategoriesModel";
import CartegorySection from "@/components/sections/CartegorySection";
import useFilteredTalents from "@/hooks/useFilteredTalents";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

export default function DiscoverPage() {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModelOpen, setModelOpen] = useState(false);
  const filteredTalents = useFilteredTalents(allTalents, selectedCategory);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Talents</h1>

      {/* Category Selection */}
      {/* <div className="hidden md:block">
        <CartegorySection
          selectedCategory={selectedCategory}
          categories={categories}
          onSelectCategory={setSelectedCategory}
        />
      </div> */}
      <div className="relative transition-all duration-300 flex items-center justify-between md:hidden mb-5">
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
        {/* {isModelOpen && (
          <CategoriesModel
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            categories={categories}
            onClose={() => setModelOpen(false)}
          />
        )} */}
      </div>

      {/* Grid of Talents */}
      {filteredTalents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <VideoCard key={talent.id} video={talent} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No talents found in this category.</p>
      )}
    </div>
  );
}
