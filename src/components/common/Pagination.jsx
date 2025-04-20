import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function Pagination({ limit, setLimit, total, page, setPage }) {
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  return (
    <div className="py-4 px-2 flex items-center justify-between text-sm">
      {/* Limit Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="num" className="text-gray-600">
          Show rows
        </label>
        <select
          name="num"
          id="num"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // reset page
          }}
          className="border border-gray-300 rounded py-1 px-2 font-mono focus:border-accent"
        >
          {[10, 15, 20, 30, 50].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-3">
        <div className="font-mono">
          {total === 0 ? "0" : `${start}–${end}`} of {total}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="p-1 text-lg hover:bg-gray-200 rounded disabled:text-gray-400"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="p-1 text-lg hover:bg-gray-200 rounded disabled:text-gray-400"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
