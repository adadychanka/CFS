"use client";

import React, { useCallback } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { ConfirmationDialog } from "@/components/dialogs/confirmation-dialog";
import { SAVED_FILES_PAGE_LIMIT } from "@/constants/constants";
import useSavedFilesTable from "@/hooks/useSavedFilesTable";
import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import type { SavedFilesResponse } from "@/types/saved-files";
import SavedFilesTable from "./saved-files-table";
import {
  SAVED_FILES_LIMIT_QUERY_KEY,
  SAVED_FILES_PAGE_QUERY_KEY,
} from "@/constants";
import ClientPagination from "@/components/pagination/client-pagination";
import { createWorkspaceUrl } from "@/lib/create-workspace-url";

const fetcher = async (url: string) => {
  const res = await clientApi.get(url);
  const data: SavedFilesResponse = await res.json();

  if (!res.ok) {
    throw new FetchError(
      data.message || "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
};

type Props = {
  workspaceId: string;
};

function SavedFiles({ workspaceId }: Props) {
  const params = useSearchParams();
  const currentPage = params.get(SAVED_FILES_PAGE_QUERY_KEY) || 1;

  const searchParams = new URLSearchParams();
  searchParams.set(SAVED_FILES_PAGE_QUERY_KEY, currentPage.toString());
  searchParams.set(
    SAVED_FILES_LIMIT_QUERY_KEY,
    SAVED_FILES_PAGE_LIMIT.toString(),
  );

  const url = createWorkspaceUrl(
    workspaceId,
    `/files?${searchParams.toString()}`,
  );

  const { data: result, error, isLoading, mutate } = useSWR(url, fetcher);

  const handleRefetch = useCallback(
    function handleRefetch() {
      mutate();
    },
    [mutate],
  );

  const {
    tableHeads,
    tableRows,
    isDialogOpen,
    handleCancelDelete,
    handleConfirmDelete,
  } = useSavedFilesTable({
    data: result?.data?.files,
    reFetch: handleRefetch,
    workspaceId,
  });

  return (
    <section className="mt-4">
      <h2 className="text-lg">All processed files</h2>
      <div className="overflow-x-auto rounded-md border">
        <SavedFilesTable
          files={result?.data?.files}
          tableHeads={tableHeads}
          tableRows={tableRows}
          filesLimit={SAVED_FILES_PAGE_LIMIT}
          error={error}
          isLoading={isLoading}
        />
      </div>
      {result?.data && (
        <ClientPagination limit={result.data.pagination.pages || 0} />
      )}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        description="This action cannot be undone. The file and all associated analyzed feedback will be permanently removed."
        question="Are you sure you want to delete this file?"
      />
    </section>
  );
}

export default SavedFiles;
