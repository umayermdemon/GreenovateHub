import { Skeleton } from "@/components/ui/skeleton";

export default function BlogListSkeleton() {
  return (
    <div>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="lg:flex justify-between pb-5">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-3 lg:w-[40%]">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 bg-gray-300" />
              <Skeleton className="h-3 w-56 bg-gray-300" />
            </div>
          </div>

          {/* Right: Status + Category + Actions */}
          <div className="flex flex-row md:flex-col lg:gap-8 lg:flex-row lg:items-center justify-between lg:justify-end lg:w-[60%]">
            <div className="flex gap-1 md:gap-3 justify-between lg:mt-0 mt-2.5">
              <Skeleton className="h-6 w-[100px] md:w-[130px] rounded-md bg-gray-300" />
              <Skeleton className="h-6 w-[100px] md:w-[120px] rounded-md bg-gray-300" />
            </div>
            <div className="flex gap-2 md:gap-4 justify-evenly lg:mt-0 mt-2">
              <Skeleton className="h-8 w-8 rounded-md bg-gray-300" />
              <Skeleton className="h-8 w-8 rounded-md bg-gray-300" />
              <Skeleton className="h-8 w-8 rounded-md bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
