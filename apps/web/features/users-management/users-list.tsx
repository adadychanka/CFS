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

type Props = {
  usersList: User[];
  isLoading: boolean;
  onMutate: () => void;
  error?: FetchError;
};

const COL_SPAN = 5;

const UsersList = ({ usersList, isLoading, onMutate, error }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[88px]">
              <div className="flex items-center gap-1">Role</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">Email</div>
            </TableHead>

            <TableHead className="w-[120px] text-center">
              <div className="flex items-center justify-center gap-1">
                Status
              </div>
            </TableHead>

            <TableHead className="w-[180px] text-center">
              <div className="flex items-center justify-center gap-1">
                Actions
              </div>
            </TableHead>
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
            renderRows={(rows) =>
              rows.map((user) => (
                <UserRow key={user.id} user={user} onMutate={onMutate} />
              ))
            }
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
