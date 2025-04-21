import React from "react";

const AdminCategoriesSkeleton = () => {
  const skeletonArray = [...Array(12)];

  return (
    <div className="animate-pulse flex flex-col gap-5">
      <div className="h-8 w-40 bg-gray-200 rounded"></div>
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 md:32 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 md:32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonArray.map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white p-4 rounded shadow "
          >
            <div className="flex items-center gap-4">
              <div className="h-4 w-6 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-300 rounded" />
              <div className="h-8 w-8 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesSkeleton;
