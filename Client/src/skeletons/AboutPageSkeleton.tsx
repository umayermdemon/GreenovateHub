import { Skeleton } from '@/components/ui/skeleton';

const AboutPageSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      {/* Welcome Section Skeleton */}
      <div className="bg-background flex items-center justify-center py-12 md:py-16 px-4">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="flex justify-center mb-8 md:mb-0">
            <Skeleton className="w-full max-w-[400px] md:max-w-[600px] h-[400px] rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-8 w-full mb-6" />
            <Skeleton className="h-24 w-full mb-6" />
            <Skeleton className="h-12 w-48 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Why Choose Section Skeleton */}
      <div className="py-12 md:py-16 px-4 bg-secondary-foreground/5 text-center">
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
          <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <Skeleton className="h-10 w-10 mx-auto mb-4 rounded-full" />
              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-16 w-full mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Download App Section Skeleton */}
      <div className="bg-background flex flex-col items-center justify-center text-center py-12 md:py-16 px-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-16 w-3/4 max-w-2xl mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Skeleton className="h-14 w-56 rounded-xl" />
          <Skeleton className="h-14 w-56 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default AboutPageSkeleton;