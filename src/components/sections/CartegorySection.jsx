"use client";

function CartegorySection({ onSelectCategory, selectedCategory, categories }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* "All" Category */}
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-2 py-1 rounded-full border transition-all duration-300 text-xs
        ${
          selectedCategory === "All"
            ? "bg-secondary hover:bg-secondary/90 text-white tracking-wide"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
        }`}
      >
        All
      </button>

      {/* Individual Categories */}
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelectCategory(cat.title)}
          className={`px-2 py-1 rounded-full border transition text-xs
          ${
            selectedCategory === cat.title
              ? "bg-secondary text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}

export default CartegorySection;
