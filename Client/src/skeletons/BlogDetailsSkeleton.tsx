const BlogDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg rounded-2xl border bg-gradient-to-br from-amber-50 via-white to-green-50 border-amber-400 animate-pulse">
      {/* Image Skeleton */}
      <div className="rounded-xl mb-6 w-full h-[500px] bg-amber-100 border-2 border-amber-200"></div>

      {/* Top Row: Badge & Actions Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-24 rounded-full bg-amber-600"></div>
        <div className="flex items-center gap-4">
          <div className="h-7 w-7 bg-amber-200 rounded" />
          <div className="h-7 w-7 bg-amber-300 rounded" />
        </div>
      </div>

      {/* Title, Author, Date Skeleton */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="h-8 w-64 bg-amber-300 rounded mb-2"></div>
          <div className="h-4 w-40 bg-amber-200 rounded"></div>
        </div>
        {/* Voting Skeleton */}
        <div className="flex gap-4 mt-1">
          <div className="flex gap-2 bg-amber-500 px-2 py-1 rounded-full">
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

      {/* Comment Section Skeleton */}
      <div className="mt-10 border-t pt-8">
        <div className="h-7 w-32 bg-amber-300 rounded mb-4" />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Comment Field Skeleton */}
          <div className="w-full md:w-1/2 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-[40px] h-[40px] bg-amber-200 rounded-full" />
              <div className="flex-1 bg-amber-50 rounded-xl px-4 py-2 border border-amber-100">
                <div className="h-4 w-full bg-amber-100 rounded mb-2" />
                <div className="h-4 w-2/3 bg-amber-100 rounded mb-2" />
                <div className="flex justify-end">
                  <div className="h-7 w-16 bg-amber-200 rounded" />
                </div>
              </div>
            </div>
          </div>
          {/* Comment List Skeleton */}
          <div className="w-full md:w-1/2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-md shadow-sm p-3 border border-amber-100 space-y-2">
                <div className="h-4 w-1/3 bg-amber-100 rounded" />
                <div className="h-4 w-2/3 bg-amber-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
