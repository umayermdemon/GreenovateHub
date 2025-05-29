const IdeaDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl lg:container mx-auto min-h-[calc(100vh-100px)] p-3 sm:p-4 md:p-6 my-6 rounded-2xl border border-green-300 bg-gradient-to-br from-amber-50 via-white to-green-50 shadow-[0_4px_24px_0_rgba(34,197,94,0.10)] overflow-hidden relative animate-pulse space-y-6">
      {/* Glassy Category Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1 rounded-full shadow text-xs sm:text-sm font-bold z-10 backdrop-blur bg-green-400/80 text-white border border-green-300">
        <div className="h-4 w-20 bg-green-200 rounded-full" />
      </div>

      {/* Images */}
      <div className="rounded-xl mb-8 overflow-hidden border-2 border-green-200">
        <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-300 rounded-xl" />
      </div>

      {/* Top Row: Premium & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-3">
        <div className="h-7 w-28 bg-gray-300 rounded-full" />
        <div className="flex items-center gap-4 flex-wrap">
          <div className="h-7 w-20 bg-gray-300 rounded-lg" />
          <div className="h-7 w-7 bg-gray-300 rounded" />
          <div className="h-7 w-7 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Title, Author, Date */}
      <div className="mb-2 space-y-2">
        <div className="h-8 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>

      {/* Description */}
      <div className="space-y-2 mt-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>

      {/* Problem & Solution */}
      <div className="mt-4 space-y-4">
        <div>
          <div className="h-5 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded mt-2" />
          <div className="h-4 w-3/4 bg-gray-200 rounded mt-1" />
        </div>
        <div>
          <div className="h-5 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded mt-2" />
          <div className="h-4 w-3/4 bg-gray-200 rounded mt-1" />
        </div>
      </div>

      {/* Status and Voting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap mt-6">
        <div className="h-7 w-32 bg-gray-300 rounded-full" />
        <div className="flex gap-4">
          <div className="flex gap-2 bg-green-200 px-4 py-1 rounded-full border border-green-100">
            <div className="h-6 w-10 bg-gray-300 rounded-full" />
            <div className="h-6 w-10 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10 border-t pt-8">
        <div className="h-7 w-32 bg-gray-300 rounded mb-4" />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Comment Field */}
          <div className="w-full md:w-1/2 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-[40px] h-[40px] bg-gray-300 rounded-full" />
              <div className="flex-1 bg-gray-100 rounded-xl px-4 py-2 border border-gray-200">
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                <div className="flex justify-end">
                  <div className="h-7 w-16 bg-green-200 rounded" />
                </div>
              </div>
            </div>
          </div>
          {/* Comment List */}
          <div className="w-full md:w-1/2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-md shadow-sm p-3 border border-gray-200 space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsSkeleton;
