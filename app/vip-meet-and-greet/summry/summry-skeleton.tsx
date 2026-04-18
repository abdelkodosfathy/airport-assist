/* ------------------------------------------------------------------ */
/*  Skeleton                                                            */
/* ------------------------------------------------------------------ */

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 rounded-md animate-pulse ${className ?? ""}`}
    />
  );
}

export default function SummarySkeleton() {
  return (
    <div className="flex gap-4">
      {/* Left column */}
      <div className="flex-2 space-y-4">
        {/* Contact Info skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-4">
          <SkeletonBox className="h-5 w-48" />
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <SkeletonBox className="h-5 w-5 rounded-full" />
              <SkeletonBox className="h-4 w-40" />
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <SkeletonBox className="h-5 w-5 rounded-full" />
                <SkeletonBox className="h-4 w-48" />
              </div>
              <div className="flex gap-2 items-center">
                <SkeletonBox className="h-5 w-5 rounded-full" />
                <SkeletonBox className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-4">
          <SkeletonBox className="h-5 w-56" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <SkeletonBox className="h-4 w-36" />
                <SkeletonBox className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Luggage skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
          <SkeletonBox className="h-6 w-6 rounded-full" />
          <SkeletonBox className="h-4 w-64" />
        </div>

        {/* File skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md flex gap-2 items-center">
          <SkeletonBox className="h-6 w-6 rounded-full" />
          <SkeletonBox className="h-4 w-52" />
        </div>

        {/* Payment breakdown skeleton */}
        <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <SkeletonBox className="h-4 w-32" />
              <SkeletonBox className="h-4 w-20" />
            </div>
          ))}
          <div className="pt-1">
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <SkeletonBox className="h-5 w-16" />
              <SkeletonBox className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="h-full flex-1 space-y-4 sticky top-26">
        {/* Total pill skeleton */}
        <div className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between">
          <SkeletonBox className="h-5 w-12" />
          <SkeletonBox className="h-6 w-28" />
        </div>

        {/* Payment form skeleton */}
        <div className="bg-white rounded-2xl p-5 space-y-4 shadow-md">
          {/* Card number */}
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-10 w-full rounded-md" />
          </div>
          {/* Expiry + CVC */}
          <div className="flex gap-3">
            <div className="space-y-2 flex-1">
              <SkeletonBox className="h-4 w-20" />
              <SkeletonBox className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2 flex-1">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-10 w-full rounded-md" />
            </div>
          </div>
          {/* Name on card */}
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-10 w-full rounded-md" />
          </div>
          {/* Checkboxes */}
          <div className="flex items-start gap-3">
            <SkeletonBox className="h-6 w-6 rounded-md shrink-0" />
            <SkeletonBox className="h-4 w-full mt-1" />
          </div>
          <div className="flex items-start gap-3">
            <SkeletonBox className="h-6 w-6 rounded-md shrink-0" />
            <SkeletonBox className="h-4 w-3/4 mt-1" />
          </div>
          {/* Button */}
          <SkeletonBox className="h-11 w-full rounded-lg" />
          {/* Stripe text */}
          <SkeletonBox className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}