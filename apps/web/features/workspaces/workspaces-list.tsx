"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@repo/ui/components/sidebar";
import WorkspaceItem from "@/features/workspaces/workspace-item";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import type { GetWorkspacesResponse } from "@/types/http";
import WorkspaceSkeleton from "@/features/workspaces/workspace-skeleton";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import { useEffect, useState } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import WorkspacesEmpty from "@/features/workspaces/workspaces-empty";
import NewWorkspaceModal from "@/features/workspaces/new-workspace/new-workspace-modal";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message || "Something went wrong", res.status);
  }

  return data.data;
};

const WorkspacesList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<GetWorkspacesResponse>(
    `/api/workspaces`,
    fetcher,
    { keepPreviousData: true },
  );

  useEffect(() => {
    clientAuthGuard(error);
  }, [error]);

  let content;

  if (isLoading) {
    content = <WorkspaceSkeleton />;
  } else if (error) {
    content = (
      <div className="px-2">
        <ErrorUnexpected
          description="Failed to fetch workspaces. Please try again."
          onRetry={mutate}
          iconSize="sm"
        />
      </div>
    );
  } else if (!data || data.workspaces.length === 0) {
    content = (
      <WorkspacesEmpty onClickCreate={() => setIsCreateModalOpen(true)} />
    );
  } else {
    content = data.workspaces.map((workspace) => (
      <WorkspaceItem
        key={workspace.id}
        workspace={workspace}
        onRefetchWorkspaces={mutate}
      />
    ));
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <NewWorkspaceModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
      <SidebarMenu>{content}</SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
