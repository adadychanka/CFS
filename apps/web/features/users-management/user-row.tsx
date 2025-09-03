"use client";

import { TableCell, TableRow } from "@repo/ui/components/table";
import { User } from "@/types/user";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle, PlayCircle } from "lucide-react";
import { disableUser, toggleUserSuspend } from "@/lib/actions/users";
import { toast } from "sonner";
import UserConfirmDisable from "@/features/users-management/user-confirm-disable";
import UserBadge from "@/features/users-management/user-badge";
import { useCallback, useMemo } from "react";

type Props = {
  user: User;
  onMutate: () => void;
};

const UserRow = ({ user, onMutate }: Props) => {
  const isAdmin = user.role === "ADMIN";
  const isDeleted = typeof user.deletedAt === "string";
  const isButtonsShown = !isAdmin && !isDeleted;

  const status: "disabled" | "suspended" | "active" = useMemo(
    () => (isDeleted ? "disabled" : user.isSuspended ? "suspended" : "active"),
    [isDeleted, user.isSuspended],
  );

  const handleDisableUser = useCallback(async () => {
    const res = await disableUser(user.id);
    if (res.success) {
      onMutate();
      toast.success("User account now disabled!");
    } else {
      toast.error("Failed to disable the user.");
    }
  }, [user.id, onMutate]);

  const handleToggleSuspend = useCallback(async () => {
    const res = await toggleUserSuspend(user.id);

    if (!res.success) {
      toast.error(
        user.isSuspended
          ? "Failed to activate the user."
          : "Failed to suspend the user.",
      );
      return;
    }

    onMutate();
    toast.success(
      user.isSuspended
        ? "User has been activated successfully."
        : "User has been suspended successfully.",
    );
  }, [user.id, user.isSuspended, onMutate]);

  return (
    <TableRow>
      <TableCell>{user.email}</TableCell>

      <TableCell className="text-center py-[14px]">
        <UserBadge type={user.role} />
      </TableCell>

      <TableCell className="text-center">
        <UserBadge type={status} />
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
