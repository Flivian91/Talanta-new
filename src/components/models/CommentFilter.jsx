import React from "react";

function CommentFilter() {
  return (
    <div className="absolute right-2 top-full z-20 shadow rounded bg-white">
      <div className="flex flex-col gap-2 px-2 py-1">
        <button className="text-xs md:text-sm tracking-wide font-medium py-0.5 px-1 hover:bg-gray-200 rounded-sm transition-all duration-300 hover:text-black ">
          Newest First
        </button>
        <button className="text-xs md:text-sm tracking-wide font-medium py-0.5 px-1 hover:bg-gray-200 rounded-sm transition-all duration-300 hover:text-black ">
          Oldest First
        </button>
      </div>
    </div>
  );
}

export default CommentFilter;
