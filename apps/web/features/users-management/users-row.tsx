"use client";

import { TableCell, TableRow } from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { User } from "@/types/user";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle, PlayCircle } from "lucide-react";
import { disableUser, toggleUserSuspend } from "@/lib/actions/users";
import { toast } from "sonner";

type Props = {
  user: User;
  onMutate: () => void;
};

const UsersRow = ({ user, onMutate }: Props) => {
  const isAdmin = user.role === "ADMIN";
  const isButtonsShown = !isAdmin && typeof user.deletedAt !== "string";

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

      if (user.isDisabled) {
        toast.success("User has been activated successfully.");
      } else {
        toast.success("User has been suspended successfully.");
      }
    } else {
      if (user.isDisabled) {
        toast.error("Failed to activate the user.");
      } else {
        toast.error("Failed to suspend the user.");
      }
    }
  };

  return (
    <TableRow>
      <TableCell>{user.email}</TableCell>

      <TableCell className="text-center py-3">
        <Badge
          className={`w-[80px] text-center capitalize ${
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
        {isButtonsShown && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggleSuspend}
            aria-label={
              user.isDisabled ? "Activate user account" : "Suspend user account"
            }
          >
            {user.isDisabled ? (
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
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDisableUser}
            aria-label="Disable user account"
          >
            <Ban /> Disable
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UsersRow;
