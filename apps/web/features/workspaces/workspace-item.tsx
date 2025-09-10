"use client";

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
import { Workspace } from "@/types/workspace";
import { usePathname } from "next/navigation";

type Props = {
  workspace: Workspace;
  onRefetchWorkspaces: () => void;
};

const WorkspaceItem = ({ workspace, onRefetchWorkspaces }: Props) => {
  const pathname = usePathname();
  const isActiveDashboard = `/workspace/${workspace.id}` === pathname;
  const isActiveUpload = pathname.startsWith(
    `/workspace/${workspace.id}/new-sentiment`,
  );

  return (
    <Collapsible className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            aria-label={`Switch to ${workspace.name} workspace`}
          >
            {/* Closed */}
            <Folder className="h-4 w-4 group-data-[state=closed]/collapsible:block hidden" />
            {/* Open */}
            <FolderOpen className="h-4 w-4 group-data-[state=open]/collapsible:block hidden" />
            {workspace.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <WorkspaceItemActions
          workspaceId={workspace.id}
          onRefetchWorkspaces={onRefetchWorkspaces}
        />

        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton isActive={isActiveDashboard} asChild>
                <Link href={`/workspace/${workspace.id}`}>Dashboard</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton isActive={isActiveUpload} asChild>
                <Link href={`/workspace/${workspace.id}/new-sentiment/manual`}>
                  New Sentiment
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default WorkspaceItem;
