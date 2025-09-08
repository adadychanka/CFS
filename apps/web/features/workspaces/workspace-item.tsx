import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Folder } from "lucide-react";

type Props = {
  name: string;
};

const WorkspaceItem = ({ name }: Props) => {
  return (
    <SidebarMenuItem key={name}>
      <SidebarMenuButton>
        <Folder />
        {name}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default WorkspaceItem;
