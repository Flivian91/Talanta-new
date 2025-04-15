import React from "react";

function LoadingAdminSkeleton() {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg animate-pulse">
      <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
      <div className="h-12 w-full bg-gray-300 rounded"></div>
    </div>
  );
}

export default LoadingAdminSkeleton;
