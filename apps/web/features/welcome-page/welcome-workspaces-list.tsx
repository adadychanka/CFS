"use client";

import { useEffect } from "react";
import useSWR from "swr";
import type { GetWorkspacesResponse } from "@/types/http";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import WelcomeWorkspaceCard from "@/features/welcome-page/welcome-workspace-card";
import WorkspaceSkeletonList from "@/features/welcome-page/welcom-workspace-skeleton";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import { ErrorEmptyList } from "@/features/error-messages/error-empty-list";
import WelcomeHeader from "@/features/welcome-page/welcome-header";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message || "Something went wrong", res.status);
  }

  return data.data;
};

const WelcomeWorkspacesList = () => {
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
    content = <WorkspaceSkeletonList />;
  } else if (error) {
    content = (
      <div className="rounded-xl border">
        <ErrorUnexpected description="We couldn’t load your workspaces. Please try again later." />
      </div>
    );
  } else if (!data || data.workspaces.length === 0) {
    content = (
      <div className="rounded-xl border">
        <ErrorEmptyList
          title="No Workspaces Yet"
          description="Workspaces help you organize projects and analyze feedback in one place. Create your first workspace to get started."
        />{" "}
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {data.workspaces.map((workspace) => (
          <WelcomeWorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    );
  }

  return (
    <>
      <WelcomeHeader onRefetchWorkspaces={mutate} />
      {content}
    </>
  );
};

export default WelcomeWorkspacesList;
