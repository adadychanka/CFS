"use client";

import { TableCell, TableRow } from "@repo/ui/components/table";
import { User, UserAccountStatus } from "@/types/user";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle, PlayCircle } from "lucide-react";
import { disableUser, toggleUserSuspend } from "@/lib/actions/users";
import { toast } from "sonner";
import UserConfirmDisable from "@/features/users-management/user-confirm-disable";
import UserBadge from "@/features/users-management/user-badge";
import { useCallback, useMemo } from "react";

type Props = {
  user: User;
  onUserChange: () => void;
};

const UserRow = ({ user, onUserChange }: Props) => {
  const isAdmin = user.role === "ADMIN";
  const isDeleted = !!user.deletedAt;
  const isButtonsShown = !isAdmin && !isDeleted;

  const status: UserAccountStatus = useMemo(
    () => (isDeleted ? "disabled" : user.isSuspended ? "suspended" : "active"),
    [isDeleted, user.isSuspended],
  );

  const handleDisableUser = useCallback(async () => {
    const res = await disableUser(user.id);
    if (res.success) {
      onUserChange();
      toast.success("User account now disabled!");
    } else {
      toast.error("Failed to disable the user.");
    }
  }, [user.id, onUserChange]);

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

    onUserChange();
    toast.success(
      user.isSuspended
        ? "User has been activated successfully."
        : "User has been suspended successfully.",
    );
  }, [user.id, user.isSuspended, onUserChange]);

  return (
    <TableRow className="odd:bg-muted/50">
      <TableCell className="pl-2 py-[14px]">
        {user.role.toLowerCase()}
      </TableCell>

      <TableCell>{user.email}</TableCell>

      <TableCell className="text-center">
        <UserBadge type={status} />
      </TableCell>

      <TableCell className="text-center">
        {isButtonsShown && (
          <div className="flex items-center justify-center gap-2">
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
                  <PlayCircle size={14} /> Activate
                </>
              ) : (
                <>
                  <PauseCircle size={14} /> Suspend
                </>
              )}
            </Button>
            <UserConfirmDisable
              onConfirm={handleDisableUser}
              triggerButtonAriaLabel="Disable user account"
            >
              <Ban size={14} /> Disable
            </UserConfirmDisable>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
