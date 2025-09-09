"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import type { User } from "@/types/user";
import { FetchError } from "@/lib/errors";
import UserRow from "@/features/users-management/user-row";
import TableStateHandler from "@/features/error-messages/table-error-states/table-state-handler";
import TableSkeleton from "@/features/error-messages/table-error-states/table-skeleton";
import { useCallback } from "react";

type Props = {
  usersList: User[] | undefined;
  isLoading: boolean;
  onUserChange: () => void;
  error: FetchError | undefined;
};

const COL_SPAN = 4;

const UsersList = ({ usersList, isLoading, onUserChange, error }: Props) => {
  const renderRows = useCallback(
    (rows: User[]) =>
      rows.map((user) => (
        <UserRow key={user.id} user={user} onUserChange={onUserChange} />
      )),
    [onUserChange],
  );

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[88px]">Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[220px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableStateHandler
            isLoading={isLoading}
            error={error}
            data={usersList}
            colSpan={COL_SPAN}
            skeleton={
              <TableSkeleton
                rows={20}
                columns={4}
                cellClassName="px-2 py-4 h-[49px]"
              />
            }
            emptyState={{
              title: "No users found",
              description:
                "No users have been added yet. Once new users join, they’ll appear here.",
            }}
            renderRows={renderRows}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
