// src/Components/VideoGrid.jsx
"use client";
import useFilteredTalents from "@/hooks/useFilteredTalents";
import { useState } from "react";
import CartegorySection from "../sections/CartegorySection";
import { allTalents } from "../data/talents";
import { categories } from "../data/categories";
import VideoCard from "../cards/VideoCard";
import { FaFilter } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

export default function VideoGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredTalents = useFilteredTalents(allTalents, selectedCategory);
  const { user, isSignedIn } = useUser();
  const fakeName = user?.primaryEmailAddress?.emailAddress.split("@").at(0);

  return (
    <div className="px-4  flex flex-col gap-4">
      <div className="text-base sm:text-xl md:text-3xl font-bold ">
        {isSignedIn ? (
          <h1 className="tracking-wide">
            Welcome back,{" "}
            <span className="font-mono">
              {user?.firstName || user?.lastName || fakeName}🎊🎊
            </span>
          </h1>
        ) : (
          <span>Recommended Talents for you</span>
        )}
      </div>
      {/* Category Selection */}
      {/* <CartegorySection
        selectedCategory={selectedCategory}
        categories={categories}
        onSelectCategory={setSelectedCategory}
      /> */}
      <div className="transition-all duration-300 flex items-center justify-between">
        <span className="text-sm md:text-base tracking-wide font-medium">
          Filter talent by:
        </span>
        <button className="flex items-center gap-2 border px-4 py-2 md:text-base sm:text-sm text-xs rounded border-surface/50 bg-stone-50 hover:bg-stone-100">
          <FaFilter />
          <span>Filter</span>
        </button>
      </div>
      <div>
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
    </div>
  );
}
