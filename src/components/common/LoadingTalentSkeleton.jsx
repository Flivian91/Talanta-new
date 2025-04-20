export default function LoadingTalentSkeleton() {
  return (
    <div className="py-3 px-2 md:px-4  space-y-4 animate-pulse">
      {/* Title */}
      <div className="h-8 bg-gray-200 rounded w-1/3" />

      {/* Search and Filter */}
      <div className="flex justify-between items-center">
        <div className="h-10 bg-gray-200 rounded w-1/2" />
        <div className="h-10 bg-gray-200 rounded w-24" />
      </div>

      {/* Table header */}
      <div className="grid grid-cols-4 gap-4 bg-gray-200 text-white p-3 rounded font-bold">
        <div className="h-4 bg-gray-100"></div>
        <div className="h-4 bg-gray-100"></div>
        <div className="h-4 bg-gray-100"></div>
        <div className="h-4 bg-gray-100"></div>
      </div>

      {/* Table rows */}
      <div className="overflow-x-auto">
        <div className="w-full min-w-[600px]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 items-center py-4 border-b"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
              <div className="flex justify-center space-x-3">
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
