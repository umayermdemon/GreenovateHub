import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-amber-50 relative border-amber-400 border-2 rounded-xl w-full sm:w-[95%] mx-auto mb-8 shadow-lg">
      {/* Image skeleton */}
      <Skeleton className="w-full h-[200px] rounded-t-xl" />

      {/* Category and options */}
      <div className="flex justify-between items-center px-4 pt-3">
        <Skeleton className="w-20 h-6 rounded-full bg-amber-400" />
        <Skeleton className="w-8 h-6 rounded-sm" />
      </div>

      {/* Content area */}
      <div className="flex justify-center px-4 pb-4 pt-2">
        <div className="w-full">
          <Skeleton className="h-6 w-3/4 mb-2 bg-amber-200" />
          <Skeleton className="h-4 w-full mb-2 bg-amber-100" />
          <div className="flex justify-between pt-1">
            <Skeleton className="w-24 h-4 bg-amber-200" />
            <div className="flex gap-4">
              <Skeleton className="w-20 h-8 rounded-full bg-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
