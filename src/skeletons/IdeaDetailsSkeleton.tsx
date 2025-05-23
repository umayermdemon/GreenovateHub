const IdeaDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg bg-amber-50 border-amber-500 border rounded-md animate-pulse space-y-6">
      {/* Image placeholder */}
      <div className="w-full h-[300px] bg-gray-300 rounded-xl" />

      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-24 bg-gray-300 rounded-full" />
        <div className="flex gap-4">
          <div className="h-6 w-6 bg-gray-300 rounded" />
          <div className="h-6 w-6 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Title & Date */}
      <div className="space-y-2">
        <div className="h-6 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
      </div>

      {/* Vote Buttons */}
      <div className="flex gap-4 mt-1">
        <div className="h-8 w-24 bg-gray-300 rounded-full" />
      </div>

      {/* Sections */}
      <div className="space-y-4 mt-4">
        <div>
          <div className="h-5 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded mt-2" />
          <div className="h-4 w-full bg-gray-200 rounded mt-1" />
        </div>
        <div>
          <div className="h-5 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded mt-2" />
          <div className="h-4 w-full bg-gray-200 rounded mt-1" />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="h-6 w-28 bg-gray-300 rounded-full" />
        <div className="h-6 w-32 bg-gray-300 rounded-full" />
      </div>

      {/* Button */}
      <div className="h-10 w-52 bg-gray-400 rounded-lg mt-4" />

      {/* Description */}
      <div className="space-y-2 mt-4">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default IdeaDetailsSkeleton;
