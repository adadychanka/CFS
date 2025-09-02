"use client";

import { Badge } from "@repo/ui/components/badge";

const actionColors: Record<string, string> = {
  API: "bg-blue-100 text-blue-800",
  DOWNLOAD: "bg-green-100 text-green-800",
  LOGIN: "bg-yellow-100 text-yellow-800",
  UPLOAD: "bg-purple-100 text-purple-800",
};

type AlertBadgeProps = {
  action: string;
};

const AlertBadge = ({ action }: AlertBadgeProps) => {
  return (
    <Badge className={`w-[80px] capitalize ${actionColors[action] || ""}`}>
      {action.toLowerCase()}
    </Badge>
  );
};

export default AlertBadge;
