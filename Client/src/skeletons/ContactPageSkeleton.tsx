import { Skeleton } from "@/components/ui/skeleton";
import PageTopStyleSkeleton from "./PageTopStyleSkeleton";

const ContactPageSkeleton = () => {
  return (
    <div className="bg-background lg:pb-12">
      {/* Header Skeleton */}
      <PageTopStyleSkeleton />

      {/* Contact Section Skeleton */}
      <div className="max-w-7xl mx-auto py-12 px-2">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Info Card Skeleton */}
          <div className="bg-card border border-border rounded-xl p-8 flex-1 flex flex-col justify-center shadow-sm">
            <Skeleton className="h-8 w-1/2 mb-4 bg-gray-300" />
            <Skeleton className="h-6 w-3/4 mb-6 bg-gray-300" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Skeleton className="h-6 w-6 mt-1 bg-gray-300" />
                <div className="w-full">
                  <Skeleton className="h-6 w-full bg-gray-300" />
                  <Skeleton className="h-6 w-full mt-2 bg-gray-300" />
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 bg-gray-300" />
                <Skeleton className="h-6 w-2/3 bg-gray-300" />
              </li>
              <li className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 bg-gray-300" />
                <Skeleton className="h-6 w-2/3 bg-gray-300" />
              </li>
            </ul>
          </div>
          {/* Contact Form Skeleton */}
          <div className="flex-1 flex lg:justify-end">
            <div className="flex flex-col gap-4 w-full md:w-[500px]">
              <Skeleton className="h-12 w-full bg-gray-300" />
              <Skeleton className="h-12 w-full bg-gray-300" />
              <Skeleton className="h-32 w-full bg-gray-300" />
              <Skeleton className="h-12 w-full bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageSkeleton;
