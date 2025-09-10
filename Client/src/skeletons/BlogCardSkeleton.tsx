import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="w-[95%] md:w-[100%] mx-auto mb-8 rounded-2xl border border-primary/30 bg-card overflow-hidden relative flex flex-col h-[480px] sm:h-[520px] md:h-[540px] lg:h-[560px]">
      {/* Blog badge skeleton */}
      <div className="absolute top-3 left-1 z-10 flex justify-between items-center w-full px-2">
        <Skeleton className="h-6 w-16 rounded-full bg-gray-300" />
        <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
      </div>

      {/* Image skeleton */}
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]">
        <Skeleton className="h-full w-full bg-gray-300" />
      </div>

      {/* Content skeleton */}
      <div className="px-4 sm:px-5 pb-4 pt-3 flex flex-col flex-grow">
        <Skeleton className="h-6 w-2/3 mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-full mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-5/6 mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-4/6 mb-4 bg-gray-300" />

        {/* Footer skeleton */}
        <div className="flex flex-row justify-between items-center gap-2 pt-2 mt-auto border-t border-primary/20">
          <Skeleton className="h-4 w-20 bg-gray-300" />
          <div className="flex gap-3 sm:gap-4">
            <Skeleton className="h-8 w-16 rounded-full bg-gray-300" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
