import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
} from "@repo/ui/components/sidebar";
import WorkspaceItem from "@/features/workspaces/workspace-item";
import { Plus } from "lucide-react";

const FAKE_WOKRSPACES = [
  "Blinksy",
  "FlowNest",
  "LumaPlay",
  "Zentro",
  "Quickly",
];

const WorkspacesList = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Create new workspace</span>
      </SidebarGroupAction>
      <SidebarMenu>
        {FAKE_WOKRSPACES.map((name) => (
          <WorkspaceItem key={name} name={name} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
