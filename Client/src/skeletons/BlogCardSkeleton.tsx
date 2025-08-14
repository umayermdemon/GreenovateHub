import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="w-full sm:w-[95%] mx-auto mb-8 rounded-2xl border border-[var(--primary)] bg-card shadow-[0_4px_24px_0_var(--primary-light)] overflow-hidden relative transition-all duration-300 flex flex-col h-[450px]">
      {/* Blog badge skeleton */}
      <div className="absolute top-3 left-1 z-10 flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-1">
          <Skeleton className="w-16 h-6 rounded-full bg-[var(--primary)]" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full bg-[var(--primary)]" />
      </div>

      {/* Image skeleton */}
      <div className="relative w-full h-[200px]">
        <Skeleton className="w-full h-full object-cover bg-gray-200" />
      </div>

      {/* Content skeleton */}
      <div className="px-5 pb-5 pt-3 flex flex-col flex-grow">
        <Skeleton className="h-7 w-2/3 mb-2 bg-[var(--primary-light)]" />
        <Skeleton className="h-4 w-full mb-3 bg-[var(--primary-light)]" />
        <div className="flex flex-row justify-between items-center gap-2 pt-2 mt-auto border-t border-[var(--primary-light)]">
          <Skeleton className="w-24 h-4 bg-[var(--primary-light)]" />
          <div className="flex gap-4">
            <Skeleton className="w-20 h-8 rounded-full bg-[var(--primary)]" />
            <Skeleton className="w-8 h-8 rounded-full bg-[var(--primary-light)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
