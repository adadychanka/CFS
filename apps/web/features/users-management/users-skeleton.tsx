import { TableCell, TableRow } from "@repo/ui/components/table";
import { Skeleton } from "@repo/ui/components/skeleton";

const UsersSkeleton = () => {
  return Array.from({ length: 20 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell key={index} className="px-2 py-4 h-[49px] ">
        <Skeleton className="h-full w-full rounded-md bg-gray-200" />
      </TableCell>
      <TableCell key={index} className="px-2 py-4 h-[49px] ">
        <Skeleton className="h-full w-full rounded-md bg-gray-200" />
      </TableCell>
      <TableCell key={index} className="px-2 py-4 h-[49px] ">
        <Skeleton className="h-full w-full rounded-md bg-gray-200" />
      </TableCell>
      <TableCell key={index} className="px-2 py-4 h-[49px] ">
        <Skeleton className="h-full w-full rounded-md bg-gray-200" />
      </TableCell>
    </TableRow>
  ));
};

export default UsersSkeleton;
