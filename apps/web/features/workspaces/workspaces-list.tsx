import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Folder } from "lucide-react";

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
          <SidebarMenuItem key={name}>
            <SidebarMenuButton>
              <Folder />
              {name}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
