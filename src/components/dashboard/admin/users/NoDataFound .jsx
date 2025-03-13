import React from "react";
import { FaSearch } from "react-icons/fa";

function NoDataFound({ resetSearch }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <FaSearch className="text-gray-400 text-6xl mb-4" />
      <h2 className="text-gray-600 text-lg font-semibold">No Data Found</h2>
      <p className="text-gray-500 text-sm mb-4">Try a different search or reset filters.</p>
      {resetSearch && (
        <button
          onClick={resetSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Reset Search
        </button>
      )}
    </div>
  );
}

export default NoDataFound;
