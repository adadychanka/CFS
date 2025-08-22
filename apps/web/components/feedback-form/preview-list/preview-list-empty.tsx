import React from "react";
import { TableCell, TableRow } from "@repo/ui/components/table";

const PreviewListEmpty = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        className="text-center py-12 text-muted-foreground"
      >
        No feedback items yet
      </TableCell>
    </TableRow>
  );
};

export default PreviewListEmpty;
