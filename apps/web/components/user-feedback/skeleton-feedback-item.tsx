import { TableCell, TableRow } from "@repo/ui/components/table";
import { Skeleton } from "@repo/ui/components/skeleton";

const SkeletonFeedbackItem = () => {
  return (
    <TableRow className={"hover:bg-transparent"}>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableCell key={index} className="px-2 py-3 h-[39px] ">
          <Skeleton className="h-full w-full rounded-md bg-gray-200" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SkeletonFeedbackItem;
