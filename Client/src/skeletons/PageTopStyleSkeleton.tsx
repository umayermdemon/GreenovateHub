const PageTopStyleSkeleton = () => {
  return (
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
  );
};

export default PageTopStyleSkeleton;
