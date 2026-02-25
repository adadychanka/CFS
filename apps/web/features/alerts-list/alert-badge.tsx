import { Badge } from "@repo/ui/components/badge";
import type { SuspiciousActivityAction } from "@/types/suspicious-activity";

const actionColors: Record<SuspiciousActivityAction, string> = {
  API: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  DOWNLOAD: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  LOGIN:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  UPLOAD:
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
};

type AlertBadgeProps = {
  action: SuspiciousActivityAction;
};

const AlertBadge = ({ action }: AlertBadgeProps) => {
  return (
    <Badge className={`w-[80px] capitalize ${actionColors[action] || ""}`}>
      {action.toLowerCase()}
    </Badge>
  );
};

export default AlertBadge;
