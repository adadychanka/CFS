"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import UsersSkeleton from "@/features/users-management/users-skeleton";
import type { User } from "@/types/user";
import { FetchError } from "@/lib/errors";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";
import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import UserRow from "@/features/users-management/user-row";

type Props = {
  usersList: User[];
  isLoading: boolean;
  onMutate: () => void;
  error?: FetchError;
};

const COL_SPAN = 4;

const UsersList = ({ usersList, isLoading, onMutate, error }: Props) => {
  let content;

  if (isLoading) content = <UsersSkeleton />;
  else if (error?.status === 429) {
    content = (
      <TableErrorTooManyRequests
        description="You’ve made too many requests in a short time. Please wait before trying again."
        colSpan={COL_SPAN}
      />
    );
  } else if (error) {
    content = (
      <TableErrorUnexpected
        description="We couldn’t load the users. Please try again later."
        colSpan={COL_SPAN}
      />
    );
  } else if (usersList.length === 0) {
    content = (
      <TableErrorEmptyList
        title="No users found"
        description="No users have been added yet. Once new users join, they’ll appear here."
        colSpan={COL_SPAN}
      />
    );
  } else {
    content = usersList.map((user) => (
      <UserRow key={user.id} user={user} onMutate={onMutate} />
    ));
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px] text-center">Role</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[120px] text-center">Suspend</TableHead>
            <TableHead className="w-[120px] text-center">Disable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
