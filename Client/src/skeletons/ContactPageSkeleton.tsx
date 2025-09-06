import { Skeleton } from '@/components/ui/skeleton';

const ContactPageSkeleton = () => {
  return (
    <div className="bg-background lg:pb-12">
      {/* Header Skeleton */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      {/* Contact Section Skeleton */}
      <div className="max-w-7xl mx-auto py-12 px-2">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Info Card Skeleton */}
          <div className="bg-card border border-border rounded-xl p-8 flex-1 flex flex-col justify-center shadow-sm">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Skeleton className="h-6 w-6 mt-1" />
                <div className="w-full">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full mt-2" />
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-2/3" />
              </li>
              <li className="flex items-center gap-3">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-2/3" />
              </li>
            </ul>
          </div>
          {/* Contact Form Skeleton */}
          <div className="flex-1 flex lg:justify-end">
            <div className="flex flex-col gap-4 w-full md:w-[500px]">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageSkeleton;