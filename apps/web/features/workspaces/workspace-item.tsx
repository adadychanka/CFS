import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Folder } from "lucide-react";
import WorkspaceItemActions from "@/features/workspaces/workspace-item-actions";

type Props = {
  name: string;
};

const WorkspaceItem = ({ name }: Props) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton aria-label={`Switch to ${name} workspace`}>
        <Folder />
        {name}
      </SidebarMenuButton>
      <WorkspaceItemActions />
    </SidebarMenuItem>
  );
};

export default WorkspaceItem;
