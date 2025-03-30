import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
function Pagination() {
  return (
    <div className="py-4 px-2 flex items-center justify-between text-sm">
      <div>
        <span>Show rows per page</span>
        <select name="num" id="num">
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
        <div>
          <button>
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
