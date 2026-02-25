import { Badge } from "@repo/ui/components/badge";
import { UserAccountStatus } from "@/types/user";

const badgeColors: Record<UserAccountStatus, string> = {
  disabled: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
  suspended:
    "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  active: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
};

const UserBadge = ({ type }: { type: UserAccountStatus }) => {
  return (
    <Badge
      className={`w-[80px] text-center ${badgeColors[type]} capitalize`}
      variant="secondary"
    >
      {type.toLowerCase()}
    </Badge>
  );
};

export default UserBadge;
