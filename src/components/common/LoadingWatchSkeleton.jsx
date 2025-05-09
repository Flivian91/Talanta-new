import React from "react";

function LoadingWatchSkeleton() {
  return (
    <div className="relative grid gap-4 grid-cols-1 md:grid-cols-[3fr_350px] animate-pulse min-h-screen">
      <div className=" bg-gray-200  rounded"></div>
      <div className=" bg-gray-200  rounded"></div>
    </div>
  );
}

export default LoadingWatchSkeleton;
