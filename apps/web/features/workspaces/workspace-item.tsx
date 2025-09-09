import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/sidebar";
import WorkspaceItemActions from "@/features/workspaces/workspace-item-actions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
import { Folder, FolderOpen } from "lucide-react";
import Link from "next/link";

type Props = {
  name: string;
};

const WorkspaceItem = ({ name }: Props) => {
  return (
    <Collapsible className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton aria-label={`Switch to ${name} workspace`}>
            {/* Closed */}
            <Folder className="h-4 w-4 group-data-[state=closed]/collapsible:block hidden" />
            {/* Open */}
            <FolderOpen className="h-4 w-4 group-data-[state=open]/collapsible:block hidden" />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <WorkspaceItemActions />

        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link href="/">Dashboard</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link href="/new-sentiment/manual">New Sentiment</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default WorkspaceItem;
