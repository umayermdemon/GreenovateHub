import { Skeleton } from "@/components/ui/skeleton";

const IdeaCardSkeleton = () => {
  return (
    <div className="rounded-xl shadow-md w-full max-w-sm mx-auto mb-6 flex flex-col items-center bg-background">
      <div className="w-full h-56 rounded-t-xl overflow-hidden relative">
        <Skeleton className="w-full h-full bg-gray-300" />
      </div>
      <div className="p-6 flex flex-col items-center text-center w-full">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-full mb-4 bg-gray-300" />
        <Skeleton className="h-4 w-full mb-4 bg-gray-300" />
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <Skeleton className="h-4 w-1/4 bg-gray-300" />
          <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default IdeaCardSkeleton;
