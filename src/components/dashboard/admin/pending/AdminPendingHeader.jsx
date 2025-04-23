import React from "react";
import { FiSearch } from "react-icons/fi";

function AdminPendingHeader({ query, setQuery }) {
  return (
    <div className="flex items-center border border-gray-300 rounded p-2 w-full bg-white md:w-1/3 mb-6">
      <FiSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search pending talents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full outline-none"
      />
    </div>
  );
}

export default AdminPendingHeader;
