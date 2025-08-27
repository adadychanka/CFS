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
import { Ban, PauseCircle } from "lucide-react";
import UsersSkeleton from "@/features/users-management/users-skeleton";
import UsersEmpty from "@/features/users-management/users-empty";
import type { User } from "@/types/user";
import { FetchError } from "@/lib/errors";
import { Badge } from "@repo/ui/components/badge";

type Props = {
  usersList: User[];
  isLoading: boolean;
  error?: FetchError;
};

const UsersList = ({ usersList, isLoading, error }: Props) => {
  let content;

  if (error) {
    content = <UsersEmpty type="error" />;
  } else if (isLoading) {
    content = <UsersSkeleton />;
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
            {!isThanos && (
              <Button size="sm" variant="ghost">
                <Ban /> Disable
              </Button>
            )}
          </TableCell>
          <TableCell className="text-center">
            {!isThanos && (
              <Button size="sm" variant="ghost">
                <PauseCircle /> Suspend
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
