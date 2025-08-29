"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle, PlayCircle } from "lucide-react";
import UsersSkeleton from "@/features/users-management/users-skeleton";
import type { User } from "@/types/user";
import { FetchError } from "@/lib/errors";
import { Badge } from "@repo/ui/components/badge";
import { suspendUnsuspendUser } from "@/lib/actions/users";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";

type Props = {
  usersList: User[];
  isLoading: boolean;
  onMutate: () => void;
  error?: FetchError;
};

const UsersList = ({ usersList, isLoading, onMutate, error }: Props) => {
  const handleToggleDisable = async (user: User) => {
    const res = await suspendUnsuspendUser(user);
    if (res.success) {
      onMutate();
    }
  };

  let content;

  if (error) {
    content = (
      <TableErrorUnexpected
        description="We couldn’t load the users. Please try again later."
        colSpan={4}
      />
    );
  } else if (isLoading) {
    content = <UsersSkeleton />;
  } else if (usersList.length === 0) {
    content = (
      <TableErrorEmptyList
        title="No users found"
        description="No users have been added yet. Once new users join, they’ll appear here."
        colSpan={4}
      />
    );
  } else {
    content = usersList.map((user) => {
      const isThanos = user.role === "ADMIN";

      return (
        <TableRow key={user.id}>
          <TableCell>{user.email}</TableCell>
          <TableCell className="text-center py-3">
            <Badge
              className={`w-[80px] text-center ${user.role === "ADMIN" ? "bg-purple-200 text-purple-800" : "bg-cyan-200 text-cyan-800"} capitalize`}
              variant="secondary"
            >
              {user.role.toLowerCase()}
            </Badge>
          </TableCell>
          <TableCell className="text-center">
            {!isThanos &&
              (user.isDisabled ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleDisable(user)}
                >
                  <PlayCircle /> Activate
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleDisable(user)}
                >
                  <PauseCircle />
                  Suspend
                </Button>
              ))}
          </TableCell>
          <TableCell className="text-center">
            {!isThanos && (
              <Button size="sm" variant="ghost">
                <Ban /> Disable
              </Button>
            )}
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px] text-center">Role</TableHead>
            <TableHead className="w-[120px] text-center">Disable</TableHead>
            <TableHead className="w-[120px] text-center">Suspend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
