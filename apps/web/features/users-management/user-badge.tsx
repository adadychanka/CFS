import { Badge } from "@repo/ui/components/badge";

type UserBadgeType = "ADMIN" | "USER" | "disabled" | "suspended" | "active";

const badgeColors: Record<UserBadgeType, string> = {
  ADMIN: "bg-purple-200 text-purple-800",
  USER: "bg-cyan-200 text-cyan-800",
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
