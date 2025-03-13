"use client";
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

function SearchUsers({ setQuery, query }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
  }
  return (
    <div className="flex items-center justify-between">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="border flex items-center border-gray-300 gap-2 rounded-sm"
      >
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="text-lg w-full font-semibold caret-accent bg-transparent px-2 outline-none border-none "
        />
        {query ? (
          <button onClick={() => setQuery("")} className="p-2">
            <FaTimes />
          </button>
        ) : (
          <button className="p-2">
            <FaSearch />
          </button>
        )}
      </form>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 border px-3 md:px-6 py-1 md:py-2 text-xs font-bold tracking-wider bg-gray-100"
        >
          <FiFilter />
          <span>Filter</span>
        </button>
        {isOpen && (
          <div className="absolute top-full mt-1 -left-5 w-32 flex items-center px-1 py-2 flex-col gap-3 z-20 bg-white shadow rounded-sm">
            <button className="text-xs font-semibold py-1 hover:bg-gray-200 w-full tracking-wide rounded-sm">
              Ascending Order
            </button>
            <button className="text-xs font-semibold py-1 hover:bg-gray-200 w-full tracking-wide rounded-sm">
              Descending Order
            </button>
            <button className="text-xs font-semibold py-1 hover:bg-gray-200 w-full tracking-wide rounded-sm">
              Date Added
            </button>
            <button className="text-xs font-semibold py-1 hover:bg-gray-200 w-full tracking-wide rounded-sm">
              User Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchUsers;
