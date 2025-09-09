import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Folder } from "lucide-react";
import WorkspaceItemActions from "@/features/workspaces/workspace-item-actions";
import { useWorkspace } from "@/providers/workspace-provider";
import { Workspace } from "@/types/workspace";

type Props = {
  workspace: Workspace;
};

const WorkspaceItem = ({ workspace }: Props) => {
  const workspaceContext = useWorkspace();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        aria-label={`Switch to ${workspace.name} workspace`}
        onClick={() => workspaceContext.setWorkspaceById(workspace.id)}
        isActive={workspaceContext.selectedWorkspace?.id === workspace.id}
      >
        <Folder />
        {workspace.name}
      </SidebarMenuButton>
      <WorkspaceItemActions />
    </SidebarMenuItem>
  );
};

export default WorkspaceItem;
