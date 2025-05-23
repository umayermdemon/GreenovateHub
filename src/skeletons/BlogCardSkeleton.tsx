import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-green-50 relative border-green-500 border rounded-md">
      {/* Image skeleton */}
      <Skeleton className="w-full h-[200px] rounded-t-md" />

      {/* Category and options */}
      <div className="flex justify-between mx-4 mt-3">
        <Skeleton className="w-20 h-6 rounded-full bg-green-800" />
        <Skeleton className="w-8 h-6 rounded-sm" />
      </div>

      {/* Content area */}
      <div className="flex justify-center p-3">
        <div className="w-full">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <div className="flex justify-between pt-1">
            <Skeleton className="w-24 h-4" />
            <div className="flex gap-4">
              <Skeleton className="w-20 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
