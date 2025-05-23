const BlogDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg rounded-md bg-green-50 border border-green-500 animate-pulse">
      {/* Image Skeleton */}
      <div className="rounded-xl mb-6 w-full h-[500px] bg-green-100"></div>

      {/* Top Bar Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-24 rounded-md bg-green-300"></div>
        <div className="flex items-center gap-4">
          <div className="h-6 w-6 bg-green-300 rounded-full"></div>
          <div className="h-6 w-6 bg-red-300 rounded-full"></div>
        </div>
      </div>

      {/* Title and Metadata Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-green-300 rounded"></div>
          <div className="h-4 w-40 bg-green-200 rounded"></div>
        </div>

        {/* Vote Section Skeleton */}
        <div className="flex gap-4 mt-1">
          <div className="flex gap-2 bg-green-500 px-2 py-1 rounded-full">
            <div className="flex gap-1 border-r pr-1 text-white text-sm">
              <div className="h-5 w-5 bg-white rounded"></div>
              <div className="h-4 w-6 bg-white rounded"></div>
            </div>
            <div className="flex gap-1 pr-1 text-white text-sm">
              <div className="h-5 w-5 bg-white rounded"></div>
              <div className="h-4 w-6 bg-white rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-[90%]"></div>
        <div className="h-4 bg-gray-300 rounded w-[80%]"></div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
