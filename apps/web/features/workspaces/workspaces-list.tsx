import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
} from "@repo/ui/components/sidebar";
import WorkspaceItem from "@/features/workspaces/workspace-item";
import { Plus } from "lucide-react";
import { useWorkspace } from "@/providers/workspace-provider";

const WorkspacesList = () => {
  const workspace = useWorkspace();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Create a new workspace</span>
      </SidebarGroupAction>
      <SidebarMenu>
        {workspace.workspaces.map((workspace) => (
          <WorkspaceItem key={workspace.id} workspace={workspace} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
