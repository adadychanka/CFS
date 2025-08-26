import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import React from "react";
import { FAKE_USERS } from "@/components/users/fake-users";
import { Button } from "@repo/ui/components/button";
import { Ban, PauseCircle } from "lucide-react";

const UsersList = () => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px] text-center">Suspend</TableHead>
            <TableHead className="w-[100px] text-center">Disable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FAKE_USERS.map((user) => (
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
