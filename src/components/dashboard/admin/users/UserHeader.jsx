import React from "react";
import { FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import { FiCloudSnow } from "react-icons/fi";

function UserHeader() {
  return (
    <div className="flex items-center gap-4 sm:flex-row flex-col justify-between">
      <div className="flex items-center gap-1 border border-gray-300/60 bg-white rounded w-full sm:w-72">
        <button className="text-lg text-gray-600 p-2">
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search bg name"
          className=" flex-1 py-1 caret-accent text-base font-mono outline-none focus:outline-none border-none bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between sm:gap-3 w-full sm:w-72">
        <button className="flex items-center text-sm justify-center gap-2 px-4 py-2 rounded bg-secondary text-white">
          <FaPlus />
          <span>Add User</span>
        </button>
        <button className="flex items-center text-sm justify-center gap-2 px-4 py-2 rounded border border-secondary text-secondary">
          <FiCloudSnow />
          <span>Download CSV</span>
        </button>
      </div>
    </div>
  );
}

export default UserHeader;
