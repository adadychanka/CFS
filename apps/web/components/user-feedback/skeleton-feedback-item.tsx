import { TableCell, TableRow } from "@repo/ui/components/table";
import { Skeleton } from "@repo/ui/components/skeleton";

const SkeletonFeedbackItem = () => {
  return (
    <TableRow className={"hover:bg-transparent"}>
      {[...Array(5)].map((el) => (
        <TableCell key={el} className="px-2 py-3 h-[38px] ">
          <Skeleton className="h-full w-full rounded-md bg-gray-200" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SkeletonFeedbackItem;
