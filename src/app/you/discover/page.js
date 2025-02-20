"use client";

import { useState } from "react";
import VideoCard from "@/Components/cards/VideoCard"; // or TalentCard if you prefer
import useFilteredTalents from "@/hooks/useFilteredTalents";
import { allTalents } from "@/components/data/talents";
import { categories } from "@/components/data/categories";
import CartegorySection from "@/components/sections/CartegorySection";

export default function DiscoverPage() {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredTalents = useFilteredTalents(allTalents, selectedCategory);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Talents</h1>

      {/* Category Selection */}
      <CartegorySection
        selectedCategory={selectedCategory}
        categories={categories}
        onSelectCategory={setSelectedCategory}
      />

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
