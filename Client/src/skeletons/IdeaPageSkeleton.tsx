import IdeaCardSkeleton from "./IdeaCardSkeleton";

const IdeaPageSkeleton = () => {
  return (
    <>
      <div className="bg-[linear-gradient(120deg,_#f8fafc_0%,_#f4f6fa_50%,_#eceff4_100%)] px-2 md:px-0">
        <div className="max-w-7xl mx-2 lg:mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center py-6 lg:py-16 justify-between">
          {/* Left side skeleton */}
          <div className="flex flex-col gap-2 w-full lg:w-auto">
            <div className="h-7 w-40 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Right side skeleton */}
          <div className="flex items-center justify-center gap-2 mt-4 lg:mt-0">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <span className="text-xl text-gray-400">›</span>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="py-2 md:py-6 max-w-7xl mx-auto px-2 sm:px-4">
        <div className="lg:flex lg:flex-row-reverse gap-3 animate-pulse">
          {/* Tabs Section */}
          <div className="flex-1 lg:mt-0 mt-2">
            <div className="mb-5">
              <div className="w-full flex overflow-x-auto gap-2">
                {/* Skeleton for each tab */}
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="min-w-[100px] h-10 bg-gray-300 rounded-md"></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4W">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <IdeaCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IdeaPageSkeleton;
