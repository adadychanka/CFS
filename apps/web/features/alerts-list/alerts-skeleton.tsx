import { TableCell, TableRow } from "@repo/ui/components/table";
import { Skeleton } from "@repo/ui/components/skeleton";

const AlertsSkeleton = () => {
  const COLUMNS = 4;

  return Array.from({ length: 20 }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: COLUMNS }).map((_, colIndex) => (
        <TableCell key={colIndex} className="px-2 py-3 h-[39px]">
          <Skeleton className="h-full w-full rounded-md bg-gray-200" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default AlertsSkeleton;
