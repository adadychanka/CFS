import { Badge } from "@repo/ui/components/badge";

type UserBadgeType = "disabled" | "suspended" | "active";

const badgeColors: Record<UserBadgeType, string> = {
  disabled: "bg-red-200 text-red-800",
  suspended: "bg-yellow-200 text-yellow-800",
  active: "bg-green-200 text-green-800",
};

const UserBadge = ({ type }: { type: UserBadgeType }) => {
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
