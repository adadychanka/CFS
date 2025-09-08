import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import WorkspaceItem from "@/features/workspaces/workspace-item";
import { FolderPlus } from "lucide-react";

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
      <SidebarMenu>
        {FAKE_WOKRSPACES.map((name) => (
          <WorkspaceItem key={name} name={name} />
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <FolderPlus />
            New workspace
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
