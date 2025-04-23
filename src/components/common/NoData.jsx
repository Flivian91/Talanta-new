import React from "react";

function NoData({message}) {
  return (
    <div className="flex items-center justify-center ">
      <div colSpan="4" className="py-10 text-center rounded-md">
        <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <p className="text-sm font-medium tracking-wide">No {message} found</p>
          <p className="text-xs text-gray-400">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoData;
