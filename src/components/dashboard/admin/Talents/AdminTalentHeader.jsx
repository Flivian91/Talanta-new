import React from "react";
import { FiSearch } from "react-icons/fi";

function AdminTalentHeader({ query, setQuery, filter, setFilter }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center border border-gray-300 bg-white rounded p-2 w-full md:w-1/3 gap-2"
      >
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search talents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-transparent"
        />
      </form>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 bg-white font-mono rounded-md px-4 py-2 outline-gray-300 "
      >
        {["all", "approved", "pending"].map((num) => (
          <option key={num} value={num} className="font-mono tracking-wider">
            {num.at(0).toUpperCase() + num.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminTalentHeader;
