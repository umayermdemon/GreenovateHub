import IdeaCardSkeleton from "./IdeaCardSkeleton";
import PageTopStyleSkeleton from "./PageTopStyleSkeleton";

const IdeaPageSkeleton = () => {
  return (
    <>
      <PageTopStyleSkeleton />

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
