import {
  SidebarGroupAction,
  SidebarGroupLabel,
} from "@repo/ui/components/sidebar";
import { Plus } from "lucide-react";

const WorkspacesHeader = () => {
  return (
    <>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Create a new workspace</span>
      </SidebarGroupAction>
    </>
  );
};

export default WorkspacesHeader;
