import React, { useMemo } from "react";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";
import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";
import type { SavedFilesTable } from "@/features/saved-files/saved-files-table";

const ERROR_ELEMENT_COL_SPAN = 5;

function useFilesTableBody({
  isLoading,
  error,
  files,
  filesLimit,
  tableRows,
}: SavedFilesTable) {
  const content = useMemo(() => {
    if (isLoading && !error) {
      return [...Array(filesLimit)].map((_, i) => (
        <SkeletonFeedbackItem key={i} />
      ));
    }

    if (!isLoading && error && error.status === 429) {
      return <TableErrorTooManyRequests colSpan={ERROR_ELEMENT_COL_SPAN} />;
    }

    if (!isLoading && error && error.status !== 429) {
      return (
        <TableErrorUnexpected
          description="We couldn’t load the files. Please try again."
          colSpan={ERROR_ELEMENT_COL_SPAN}
        />
      );
    }

    if (!isLoading && !error && (!files || files.length === 0)) {
      return (
        <TableErrorEmptyList
          title="No feedback files found"
          description="Looks like there’s nothing here yet. Check back later or upload some
                feedback files."
          colSpan={ERROR_ELEMENT_COL_SPAN}
        />
      );
    }

    if (!isLoading && !error && tableRows) {
      return tableRows;
    }

    return (
      <TableErrorEmptyList
        title="No feedback files found"
        description="Looks like there’s nothing here yet. Check back later or upload some
                feedback files."
        colSpan={ERROR_ELEMENT_COL_SPAN}
      />
    );
  }, [isLoading, error, files, filesLimit, tableRows]);

  return content;
}

export default useFilesTableBody;
