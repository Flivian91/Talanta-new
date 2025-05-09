"use client";

import React from "react";

function HomeTalentsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8}).map((_, index) => (
        <div
          key={index}
          className="rounded-md overflow-hidden bg-white shadow animate-pulse"
        >
          {/* Video Thumbnail Placeholder */}
          <div className="h-40 bg-gray-300 w-full"></div>

          {/* Title */}
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>

            {/* User + Views */}
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeTalentsSkeleton;
