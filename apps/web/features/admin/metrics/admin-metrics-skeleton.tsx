import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { memo } from "react";

const CardSkeleton = () => {
  return (
    <Card className="@container/card transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <CardHeader>
        <CardDescription>
          <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse @[250px]/card:h-9"></div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground w-full">
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </div>
      </CardFooter>
    </Card>
  );
};

export const CardSkeletonGroup = memo(function CardSkeletonGroup({
  count = 1,
}: {
  count: number;
}) {
  return (
    <div className="@container/main py-4 md:gap-6 md:py-6">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
});
