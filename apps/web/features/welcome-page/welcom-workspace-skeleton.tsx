import { Skeleton } from "@repo/ui/components/skeleton";

const WorkspaceSkeletonList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="py-6 px-4 bg-card flex flex-col gap-6 rounded-xl border"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkspaceSkeletonList;
