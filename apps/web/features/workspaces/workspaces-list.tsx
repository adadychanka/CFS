import { SidebarGroup, SidebarMenu } from "@repo/ui/components/sidebar";
import WorkspaceItem from "@/features/workspaces/workspace-item";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import type { GetWorkspacesResponse } from "@/types/http";
import WorkspaceSkeleton from "@/features/workspaces/workspace-skeleton";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import { useEffect } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import WorkspacesHeader from "@/features/workspaces/workspaces-header";
import WorkspacesEmpty from "@/features/workspaces/workspaces-empty";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message || "Something went wrong", res.status);
  }

  return data.data;
};

const WorkspacesList = () => {
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
    content = <WorkspacesEmpty />;
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
      <WorkspacesHeader />
      <SidebarMenu>{content}</SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkspacesList;
