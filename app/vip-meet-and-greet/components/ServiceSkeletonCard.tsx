"use client";

export default function ServiceCardSkeleton() {
  return (
    <div className="mt-8 rounded-xl p-3 bg-[#F4F4F4] border border-[#E0E0E0] animate-pulse">
      {/* Top Section */}
      <div className="flex gap-4">
        <div className="p-2 flex-2 flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center w-full">
              {/* Radio */}
              <div className="min-w-6 min-h-6 rounded-full bg-gray-300" />

              {/* Title + Description */}
              <div className="w-full space-y-2">
                <div className="h-4 bg-gray-300 rounded w-40" />
                <div className="h-3 bg-gray-200 rounded w-64" />
              </div>
            </div>

            {/* Price */}
            <div className="min-w-20 h-8 bg-gray-300 rounded-md" />
          </div>

          {/* Divider */}
          <span className="my-4 h-px bg-gray-200 w-full" />

          {/* Small Description */}
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Image Skeleton */}
        <div className="flex-1">
          <div className="rounded-lg w-full h-[140px] bg-gray-300" />
        </div>
      </div>

      {/* Details Grid Skeleton */}
      <div className="mt-6 mb-4 grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-2.5 items-start">
            <div className="w-12 h-12 rounded-lg bg-gray-300" />
            <div className="space-y-2 w-full">
              <div className="h-3 bg-gray-300 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="h-7 w-28 bg-gray-300 rounded-full mt-2" />
    </div>
  );
}
