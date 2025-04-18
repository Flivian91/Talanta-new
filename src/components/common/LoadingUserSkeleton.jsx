import React from "react";

function LoadingUserSkeleton() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center py-1 px-1 ">
      <div className="flex gap-2 items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="flex flex-col gap-2">
          <span className="w-24 h-3 bg-gray-200 animate-pulse"></span>
          <span className="w-24 h-3 bg-gray-200 animate-pulse"></span>
        </div>
      </div>
      <div className="bg-gray-200 rounded-full w-16 h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-16 h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-16 h-6 animate-pulse"></div>
    </div>
  );
}

export default LoadingUserSkeleton;
