import { Skeleton } from "@/components/ui/skeleton";

const IdeaCardSkeleton = () => {
  return (
    <div className="w-full sm:w-[95%] mx-auto mb-8 shadow-lg rounded-xl border-2 border-[var(--primary)] bg-card overflow-hidden relative">
      {/* Badge skeleton */}
      <div className="absolute top-3 left-1 z-10 flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-1">
          <Skeleton className="w-16 h-6 rounded-full bg-[var(--primary)]" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full bg-[var(--primary)]" />
      </div>
      {/* Image skeleton */}
      <div className="relative w-full h-[250px]">
        <Skeleton className="w-full h-full object-cover bg-gray-200" />
      </div>
      {/* Content skeleton */}
      <div className="px-4 pb-4 pt-2">
        <Skeleton className="h-7 w-2/3 mb-2 bg-gray-200" />
        <Skeleton className="h-[1px] w-full mb-3 bg-gray-200" />
        <div className="flex flex-row justify-between items-center gap-2 pt-2">
          <Skeleton className="w-24 h-4 bg-gray-200" />
          <Skeleton className="w-10 h-8 rounded-full bg-gray-200 border-2 border-[var(--primary)]" />
        </div>
      </div>
    </div>
  );
};

export default IdeaCardSkeleton;
