import TableErrorTooManyRequests from "@/features/error-messages/table-error-states/table-error-too-many-requests";
import TableErrorUnexpected from "@/features/error-messages/table-error-states/table-error-unexpected";
import TableErrorEmptyList from "@/features/error-messages/table-error-states/table-error-empty-list";
import { FetchError } from "@/lib/errors";
import type { ReactNode } from "react";

type TableStateHandlerProps<T> = {
  isLoading: boolean;
  error: FetchError | undefined;
  data: T[] | undefined;
  colSpan: number;
  renderRows: (data: T[]) => ReactNode;
  skeleton: ReactNode;
  emptyState?: {
    title?: string;
    description?: string;
  };
};

/**
 * TableStateHandler is a utility component to handle the different states of a table, such as loading, error, empty,
 * or displaying rows when data is successfully fetched.
 */
const TableStateHandler = <T,>({
  isLoading,
  error,
  data,
  colSpan,
  renderRows,
  skeleton,
  emptyState,
}: TableStateHandlerProps<T>) => {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (error?.status === 429) {
    return (
      <TableErrorTooManyRequests
        description="You’ve made too many requests in a short time. Please wait before trying again."
        colSpan={colSpan}
      />
    );
  }

  if (error) {
    return (
      <TableErrorUnexpected
        description="We couldn’t load the data. Please try again later."
        colSpan={colSpan}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableErrorEmptyList
        title={emptyState?.title || "No results found"}
        description={
          emptyState?.description ||
          "There’s no data to show right now. Please check back later."
        }
        colSpan={colSpan}
      />
    );
  }

  return <>{renderRows(data)}</>;
};

export default TableStateHandler;
