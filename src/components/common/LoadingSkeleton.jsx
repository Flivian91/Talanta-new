import React from "react";

function LoadingSkeleton() {
  return (
    <div className="p-6">
      {/* Skeleton Header */}
      <div className="h-8 w-40 bg-gray-300 rounded-md animate-pulse mb-6"></div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg animate-pulse">
            <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Skeleton Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="h-64 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-64 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
