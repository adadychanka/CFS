import { DynamicTableProps } from "@/components/user-feedback/dynamic-feedback-table";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";
import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";
import React, { useMemo } from "react";

const ERROR_ELEMENT_COL_SPAN = 5;

function useTableBody({
  isLoading,
  error,
  feedbackList,
  feedbackLimit,
  onRetry,
  tableRows,
}: DynamicTableProps) {
  const content = useMemo(() => {
    if (isLoading && !error) {
      return [...Array(feedbackLimit)].map((_, i) => (
        <SkeletonFeedbackItem key={i} />
      ));
    }

    if (!isLoading && error && error.status === 429) {
      return <TableErrorTooManyRequests colSpan={ERROR_ELEMENT_COL_SPAN} />;
    }

    if (!isLoading && error && error.status !== 429) {
      return <TableErrorUnexpected
        description="We couldn’t load the feedback. Please try again."
        colSpan={ERROR_ELEMENT_COL_SPAN}
      />;
    }

    if (!isLoading && !error && (!feedbackList || feedbackList.length === 0)) {
      return <TableErrorEmptyList
        title="No feedback found"
        description="Looks like there’s nothing here yet. Check back later or add some
                feedback."
        colSpan={ERROR_ELEMENT_COL_SPAN}
      />
    }

    if (!isLoading && !error && tableRows) {
      return tableRows;
    }

    return <TableErrorEmptyList
      title="No feedback found"
      description="Looks like there’s nothing here yet. Check back later or add some
                feedback."
      colSpan={ERROR_ELEMENT_COL_SPAN}
    />;
  }, [isLoading, error, feedbackList, feedbackLimit, tableRows]);

  return content;
}

export default useTableBody;
