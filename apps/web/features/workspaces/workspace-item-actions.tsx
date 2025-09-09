import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { SidebarMenuAction } from "@repo/ui/components/sidebar";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

const WorkspaceItemActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
          <span className="sr-only">Open actions dropdown</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem aria-label="Rename workspace">
          <Pencil />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem aria-label="Delete workspace">
          <Trash />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceItemActions;
