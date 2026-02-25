import { TableCell, TableRow } from "@repo/ui/components/table";
import { Skeleton } from "@repo/ui/components/skeleton";

type TableSkeletonProps = {
  rows?: number;
  columns: number;
  cellClassName?: string;
};

const TableSkeleton = ({
  rows = 20,
  columns,
  cellClassName = "px-2 py-3 h-[39px]",
}: TableSkeletonProps) => {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: columns }).map((_, colIndex) => (
        <TableCell key={colIndex} className={cellClassName}>
          <Skeleton className="h-full w-full rounded-md bg-neutral-200 dark:bg-neutral-700" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableSkeleton;
