import React from "react";

function CategoriesModel({
  onSelectCategory,
  selectedCategory,
  categories,
  onClose,
}) {
  function handleSelectCatgeory(cat) {
    onSelectCategory(cat);
    onClose();
  }
  return (
    <div className="absolute top-0 right-0 z-50 px-2 py-4 w-60 shadow rounded bg-white md:hidden">
      <div className="flex flex-col gap-2 w-full transition-all tracking-wide font-semibold duration-300 text-sm">
        <button
          onClick={() => handleSelectCatgeory("All")}
          className={`px-4 py-2  rounded ${
            selectedCategory === "All"
              ? "bg-secondary shadow hover:bg-secondary/90 text-white"
              : "bg-white border  text-black border-gray-300 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            onClick={() => handleSelectCatgeory(cat)}
            className={`px-4 py-2  rounded ${
              selectedCategory === cat
                ? "bg-secondary shadow hover:bg-secondary/90 text-white"
                : "bg-white border  text-black border-gray-300 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoriesModel;
