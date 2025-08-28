import { TableCell, TableRow } from "@repo/ui/components/table";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  colSpan: number;
};

const TableErrorContainer = ({ children, colSpan }: Props) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>{children}</TableCell>
    </TableRow>
  );
};

export default TableErrorContainer;
