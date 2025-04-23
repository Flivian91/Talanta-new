"use client";

import React from "react";

const AdminPendingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow animate-pulse p-4 space-y-3"
        >
          {/* Thumbnail placeholder */}
          <div className="w-full h-40 bg-gray-200 rounded-md" />

          {/* Title */}
          <div className="h-5 bg-gray-300 rounded w-3/4" />

          {/* Author and category */}
          <div className="flex gap-2 items-center">
            <div className="h-4 bg-gray-300 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-12" />
          </div>

          {/* Date */}
          <div className="h-4 bg-gray-200 rounded w-40" />

          {/* Button */}
          <div className="mt-4">
            <div className="h-10 bg-blue-300 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPendingSkeleton;
