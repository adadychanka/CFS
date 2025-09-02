"use client";

import { TableCell, TableRow } from "@repo/ui/components/table";
import { formatCreatedAtDate } from "@/utils/date-utils";
import AlertBadge from "./alert-badge";
import type { SuspiciousActivity } from "@/types/suspicious-activity";

type AlertRowProps = {
  alert: SuspiciousActivity;
};

const AlertRow = ({ alert }: AlertRowProps) => {
  return (
    <TableRow>
      <TableCell className="max-w-[240px] truncate">
        {alert.email || "unknown user"}
      </TableCell>
      <TableCell className="text-center">
        <AlertBadge action={alert.action} />
      </TableCell>
      <TableCell className="truncate max-w-[400px]">{alert.details}</TableCell>
      <TableCell>{formatCreatedAtDate(alert.createdAt)}</TableCell>
    </TableRow>
  );
};

export default AlertRow;
