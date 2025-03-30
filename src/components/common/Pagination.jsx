import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
function Pagination() {
  return (
    <div className="py-4 px-2 flex items-center justify-between text-sm">
      <div className="flex ic gap-2">
        <label htmlFor="num" className="text-gray-600">Show rows per page</label>
        <select name="num" id="num" className="border border-gray-300 rounded py-1 px-2 font-mono focus:border-accent active:border-accent outline-accent">
          <option value="10">10</option>
          <option value="10">15</option>
          <option value="10">20</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <span className="font-mono">1-8</span>
          <span>of</span>
          <span className="font-mono">32</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1 text-lg hover:bg-gray-200 rounded">
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button className="p-1 text-lg hover:bg-gray-200 rounded">
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
