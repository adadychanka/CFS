import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
} from "@repo/ui/components/sidebar";
import WorkspaceItem from "@/features/workspaces/workspace-item";
import { Plus } from "lucide-react";
import { fakeWorkspaces } from "@/features/workspaces/fake-workspaces";

const WorkspacesList = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Create a new workspace</span>
      </SidebarGroupAction>
      <SidebarMenu>
        {fakeWorkspaces.map((workspace) => (
          <WorkspaceItem key={workspace.id} workspace={workspace} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
