import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

function AdminCategoriesHeader({ query, setQuery, title, setTitle }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center border border-gray-300 bg-white rounded px-2 py-1 w-full md:w-1/3">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-transparent caret-accent"
        />
      </div>
      <form className="flex gap-2 items-center justify-between md:justify-end w-full">
        <input
          type="text"
          placeholder="New Category"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border caret-accent border-gray-300 outline-none px-2 py-1 rounded "
        />
        <button
          className="bg-blue-500 text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2 font-medium tracking-wide"
        >
          <FiPlus />
          <span>Add Category</span>
        </button>
      </form>
    </div>
  );
}

export default AdminCategoriesHeader;
