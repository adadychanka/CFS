import UsersList from "@/components/users-management/users-list";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Search } from "lucide-react";
import PaginationSection from "@/components/user-feedback/pagination-section";
import { Suspense } from "react";

const UsersSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input type="email" placeholder="Search by email" />
        <Button variant="outline">
          <Search /> Search
        </Button>
      </div>

      <UsersList />

      {/* TODO: Need custom loader it seems */}
      <Suspense fallback={"Loading..."}>
        <PaginationSection limit={20} />
      </Suspense>
    </div>
  );
};

export default UsersSection;
