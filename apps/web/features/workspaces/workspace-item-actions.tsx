"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { SidebarMenuAction } from "@repo/ui/components/sidebar";
import { MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";
import RenameWorkspaceModal from "@/features/workspaces/rename-workspace/rename-workspace-modal";
import DeleteWorkspaceConfirmDialog from "@/features/workspaces/delete-workspace/delete-workspace-confirm-dialog";
import { Workspace } from "@/types/workspace";

type Props = {
  workspace: Workspace;
  onRefetchWorkspaces: () => void;
};

const WorkspaceItemActions = ({ workspace, onRefetchWorkspaces }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">Open actions dropdown</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            aria-label="Rename workspace"
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
              setIsRenameOpen(true);
            }}
          >
            <Pencil />
            <span>Rename</span>
          </DropdownMenuItem>

          <DeleteWorkspaceConfirmDialog
            workspaceId={workspace.id}
            onCloseDropdown={() => setIsDropdownOpen(false)}
            onRefetchWorkspaces={onRefetchWorkspaces}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameWorkspaceModal
        workspace={workspace}
        open={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        onRefetchWorkspaces={onRefetchWorkspaces}
      />
    </>
  );
};

export default WorkspaceItemActions;
