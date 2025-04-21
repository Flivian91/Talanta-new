import React from "react";

function AdminTalentSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-2 w-full">
      <div>
        <div className="w-24 h-10 bg-gray-200 rounded"></div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-40 h-7 bg-gray-200 rounded"></div>
        <div className="w-20 h-7 bg-gray-200 rounded"></div>
      </div>
      {/* Video Area */}
      <div className="w-full h-72 bg-gray-200 rounded"></div>
      <div className="w-full h-12 bg-gray-200 rounded"></div>
      <div className="w-full h-20 bg-gray-200 rounded"></div>
      <div className="w-full h-12 bg-gray-200 rounded"></div>
      <div className="flex items-center justify-between">
        <div className="w-24 h-10 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-10 bg-gray-200 rounded"></div>
          <div className="w-24 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default AdminTalentSkeleton;
