"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import React from "react";
import { FAKE_USERS } from "@/features/users-management/fake-users";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle } from "lucide-react";
import UsersSkeleton from "@/features/users-management/users-skeleton";
import UsersEmpty from "@/features/users-management/users-empty";

const UsersList = () => {
  const isEmpty = true;
  const isLoading = true;
  const isError = true;
  const users = FAKE_USERS;

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="w-[120px] text-center">Suspend</TableHead>
            <TableHead className="w-[120px] text-center">Disable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <UsersSkeleton />}
          {isEmpty && <UsersEmpty type="empty" />}
          {isError && <UsersEmpty type="error" />}

          {users &&
            FAKE_USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="ghost">
                    <PauseCircle /> Suspend
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="ghost">
                    <Ban /> Disable
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
