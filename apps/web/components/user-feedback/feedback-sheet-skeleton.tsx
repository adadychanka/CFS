import { Skeleton } from "@repo/ui/components/skeleton";

const FeedbackSheetSkeleton = () => {
  return (
    <div className="mx-6 space-y-4">
      <div className="space-y-1">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-5 w-3/4 bg-gray-200" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-5 w-12 bg-gray-200" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-5 w-full bg-gray-200" />
        <Skeleton className="h-5 w-10/12 bg-gray-200" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-5 w-32 bg-gray-200" />
      </div>
    </div>
  );
};

export default FeedbackSheetSkeleton;
