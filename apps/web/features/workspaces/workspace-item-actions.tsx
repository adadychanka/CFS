import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { SidebarMenuAction } from "@repo/ui/components/sidebar";
import { MoreHorizontal, Pencil } from "lucide-react";
import DeleteWorkspaceConfirmDialog from "@/features/workspaces/delete-workspace/delete-workspace-confirm-dialog";
import { useState } from "react";

type Props = {
  workspaceId: string;
  onRefetchWorkspaces: () => void;
};

const WorkspaceItemActions = ({ workspaceId, onRefetchWorkspaces }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
        <DeleteWorkspaceConfirmDialog
          workspaceId={workspaceId}
          onCloseDropdown={() => setIsOpen(false)}
          onRefetchWorkspaces={onRefetchWorkspaces}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceItemActions;
