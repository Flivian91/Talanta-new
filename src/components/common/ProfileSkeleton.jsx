"use client";

export default function ProfileSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-5 w-48 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_300px]  gap-3">
        {/* Personal Information */}
        <div className="bg-white border p-6 rounded-lg shadow-sm">
          <div className="h-5 w-44 bg-gray-300 rounded mb-6"></div>

          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 bg-gray-300 rounded-full mb-3"></div>
              <div className="h-8 w-32 bg-gray-300 rounded mb-1"></div>
              <div className="text-xs text-gray-400">
                Recommended size: 1:1, up to 2MB
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-6 w-36 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>

              <div className="mt-6 h-10 w-32 bg-green-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* User Info Side Panel */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          {["User ID", "External ID", "Primary Email", "User Since"].map(
            (label, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded"></div>
                <div className="h-5 w-full bg-gray-200 rounded"></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
