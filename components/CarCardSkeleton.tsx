export default function CarCardSkeleton() {
  return (
    <div className="bg-white flex flex-col justify-between rounded-lg p-4 shadow-md border-2 border-white animate-pulse">
      {/* Header: Name + Radio */}
      <div className="flex justify-between items-start mb-1">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="min-w-5 min-h-5 rounded-full border border-gray-200 bg-gray-200" />
      </div>

      {/* Description */}
      <div className="h-3 w-44 bg-gray-200 rounded mb-3" />

      {/* Car Image */}
      <div className="rounded-lg h-30 w-full bg-gray-200 mb-3" style={{ height: "120px" }} />

      {/* Footer */}
      <div>
        {/* Passengers + Bags + Miles */}
        <div className="flex justify-between items-end pb-1 mb-1 border-b border-[#E5E5E5]">
          <div className="flex gap-2">
            <div className="h-3 w-8 bg-gray-200 rounded" />
            <div className="h-3 w-8 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-28 bg-gray-200 rounded" />
        </div>

        {/* Pricing rows */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-10 bg-gray-200 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-14 bg-gray-200 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}