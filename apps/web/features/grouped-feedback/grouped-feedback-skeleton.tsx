import { Skeleton } from "@repo/ui/components/skeleton";
import { ChevronDownIcon } from "lucide-react";

type Props = {
  rows?: number;
};

export function GroupedFeedbackSkeleton({ rows = 5 }: Props) {
  const mockDataArray = Array.from({ length: rows });

  return (
    <ul className="flex flex-col gap-4">
      {mockDataArray.map((_, index) => {
        return (
          <li
            key={index}
            className="flex justify-between border-b last:border-b-0 pb-4"
          >
            <Skeleton className="w-1/4 h-6 rounded-md bg-gray-200" />
            <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
          </li>
        );
      })}
    </ul>
  );
}
