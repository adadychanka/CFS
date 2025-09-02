"use client";

import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { ConfirmationDialog } from "@/components/dialogs/confirmation-dialog";
import DynamicFeedbackTable from "@/components/user-feedback/dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { SAVED_FILES_PAGE_LIMIT } from "@/constants/constants";
import useSavedFilesTable from "@/hooks/useSavedFilesTable";
import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import { SavedFilesResponse } from "@/types/saved-files";

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

function SavedFiles() {
  const params = useSearchParams();
  const currentPage = params.get("page") || 1;

  const {
    data: result,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `/api/files?page=${currentPage}&limit=${SAVED_FILES_PAGE_LIMIT}`,
    fetcher,
  );
  console.log(result?.data);

  function handleRefetch() {
    mutate();
  }

  const {
    tableHeads,
    tableRows,
    isDialogOpen,
    handleCancelDelete,
    handleConfirmDelete,
  } = useSavedFilesTable({ data: result?.data?.files, reFetch: handleRefetch });

  return (
    <section className="mt-4">
      <h1 className="text-lg">Saved Files</h1>

      <DynamicFeedbackTable
        feedbackList={result?.data?.files || []}
        tableHeads={tableHeads}
        tableRows={[
          <AnimatePresence
            key="saved-files"
            initial={false}
            onExitComplete={handleCancelDelete}
          >
            {tableRows}
          </AnimatePresence>,
        ]}
        feedbackLimit={SAVED_FILES_PAGE_LIMIT}
        error={error}
        isLoading={isLoading}
      />
      {result?.data && (
        <FeedbackTablePagination limit={result.data.pagination.pages | 0} />
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
