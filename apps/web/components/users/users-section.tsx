import UsersList from "@/components/users/users-list";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Search } from "lucide-react";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { Suspense } from "react";

const UsersSection = () => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Input type="email" placeholder="Search by email" />
        <Button variant="outline">
          <Search /> Search
        </Button>
      </div>
      <UsersList />

      {/* TODO: Need custom loader it seems */}
      <Suspense fallback={"Loading..."}>
        <FeedbackTablePagination limit={20} />
      </Suspense>
    </div>
  );
};

export default UsersSection;
