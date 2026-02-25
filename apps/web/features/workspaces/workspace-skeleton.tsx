import { Skeleton } from "@repo/ui/components/skeleton";

const WorkspaceSkeleton = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="p-2">
      <Skeleton className="w-full h-4 bg-neutral-200 dark:bg-neutral-700" />
    </div>
  ));
};

export default WorkspaceSkeleton;
