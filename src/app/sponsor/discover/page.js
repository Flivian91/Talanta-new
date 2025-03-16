"use client";
import { useState } from "react";
import { FiSearch, FiHeart, FiFilter, FiPlay } from "react-icons/fi";

const dummyTalents = [
  {
    id: 1,
    title: "Hip-Hop Freestyle",
    category: "Dance",
    thumbnail: "https://source.unsplash.com/random/200x200/?dance",
    videoUrl: "#",
    likes: 120,
  },
  {
    id: 2,
    title: "Acoustic Guitar Performance",
    category: "Music",
    thumbnail: "https://source.unsplash.com/random/200x200/?music",
    videoUrl: "#",
    likes: 85,
  },
  {
    id: 3,
    title: "Speed Painting Art",
    category: "Art",
    thumbnail: "https://source.unsplash.com/random/200x200/?art",
    videoUrl: "#",
    likes: 60,
  },
];

export default function DiscoverTalentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTalents, setFilteredTalents] = useState(dummyTalents);

  function handleSearch(query) {
    setSearchQuery(query);
    if (query.length < 1) {
      setFilteredTalents(dummyTalents);
    } else {
      setFilteredTalents(
        dummyTalents.filter((talent) =>
          talent.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Discover Talents</h1>

      {/* Search & Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border p-2 rounded-md flex-1">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search talents..."
            className="ml-2 outline-none w-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button className="bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2">
          <FiFilter />
          Filter
        </button>
      </div>

      {/* Talents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTalents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </div>
  );
}

function TalentCard({ talent }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img src={talent.thumbnail} alt={talent.title} className="w-full h-48 object-cover" />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full">
          <FiHeart className="text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{talent.title}</h3>
        <p className="text-gray-500 text-sm">{talent.category}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-600 text-sm">{talent.likes} Likes</span>
          <a href={talent.videoUrl} className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-2">
            <FiPlay />
            Watch
          </a>
        </div>
      </div>
    </div>
  );
}
