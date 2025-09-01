"use client";

import { TableCell, TableRow } from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { User } from "@/types/user";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle, PlayCircle } from "lucide-react";
import { disableUser, toggleUserSuspend } from "@/lib/actions/users";
import { toast } from "sonner";
import UserConfirmDisable from "@/features/users-management/user-confirm-disable";

type Props = {
  user: User;
  onMutate: () => void;
};

const UserRow = ({ user, onMutate }: Props) => {
  const isAdmin = user.role === "ADMIN";
  const isDeleted = typeof user.deletedAt === "string";
  const isButtonsShown = !isAdmin && !isDeleted;

  const handleDisableUser = async () => {
    const res = await disableUser(user.id);
    if (res.success) {
      onMutate();
      toast.success("User account now disabled!");
    } else {
      toast.error("Failed to disable the user.");
    }
  };

  const handleToggleSuspend = async () => {
    const res = await toggleUserSuspend(user.id);

    if (res.success) {
      onMutate();

      if (user.isSuspended) {
        toast.success("User has been activated successfully.");
      } else {
        toast.success("User has been suspended successfully.");
      }
    } else {
      if (user.isSuspended) {
        toast.error("Failed to activate the user.");
      } else {
        toast.error("Failed to suspend the user.");
      }
    }
  };

  return (
    <TableRow>
      <TableCell>{user.email}</TableCell>

      <TableCell className="text-center py-[14px]">
        <Badge
          className={`px-3 min-w-[90px] text-center capitalize ${
            isAdmin
              ? "bg-purple-200 text-purple-800"
              : "bg-cyan-200 text-cyan-800"
          }`}
          variant="secondary"
        >
          {user.role.toLowerCase()}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        {isDeleted ? (
          <Badge className="px-3 min-w-[90px] bg-red-200 text-red-800">
            Disabled
          </Badge>
        ) : user.isSuspended ? (
          <Badge className="px-3 min-w-[90px] bg-yellow-200 text-yellow-800">
            Suspended
          </Badge>
        ) : (
          <Badge className="px-3 min-w-[90px] bg-green-200 text-green-800">
            Active
          </Badge>
        )}
      </TableCell>

      <TableCell className="text-center">
        {isButtonsShown && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggleSuspend}
            aria-label={
              user.isSuspended
                ? "Activate user account"
                : "Suspend user account"
            }
          >
            {user.isSuspended ? (
              <>
                <PlayCircle /> Activate
              </>
            ) : (
              <>
                <PauseCircle /> Suspend
              </>
            )}
          </Button>
        )}
      </TableCell>

      <TableCell className="text-center">
        {isButtonsShown && (
          <UserConfirmDisable
            onConfirm={handleDisableUser}
            ariaLabel="Disable user account"
          >
            <Ban /> Disable
          </UserConfirmDisable>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
