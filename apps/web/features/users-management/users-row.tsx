"use client";

import { TableCell, TableRow } from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { User } from "@/types/user";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle, PlayCircle } from "lucide-react";
import { disableUser } from "@/lib/actions/users";
import { toast } from "sonner";

type Props = {
  user: User;
  onToggleSuspend: () => void;
};

const UsersRow = ({ user, onToggleSuspend }: Props) => {
  const isAdmin = user.role === "ADMIN";

  const handleDisableUser = async () => {
    const res = await disableUser(user.id);
    if (res.success) {
      toast.success("User account now disabled!");
    } else {
      toast.error("Failed to disable the user.");
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
        {!isAdmin && (
          <Button size="sm" variant="ghost" onClick={onToggleSuspend}>
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
        {!isAdmin && (
          <Button size="sm" variant="ghost" onClick={handleDisableUser}>
            <Ban /> Disable
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UsersRow;
