import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

function AdminCategoriesHeader({ query, setQuery, title, setTitle }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full md:w-1/3">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-transparent caret-accent"
        />
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="New Category"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

export default AdminCategoriesHeader;
