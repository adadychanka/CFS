"use client";

import useSWR from "swr";
import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import ClientPagination from "@/components/pagination/client-pagination";
import { type GetFeedbackResponse } from "@/types/http";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import useFeedbackTable from "@/hooks/useFeedbackTable";
import { useSampleMode } from "@/context/use-sample-mode";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message || "Something went wrong", res.status);
  }

  return data.data;
};

type Props = {
  currentPage: number;
  sentiment: string;
};

const FeedbackTable = ({ currentPage, sentiment }: Props) => {
  const { isSampleMode } = useSampleMode();

  const { data, error, isLoading } = useSWR<GetFeedbackResponse>(
    `/api/feedback?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}&sentiment=${sentiment}&isSampleMode=${isSampleMode}`,
    fetcher,
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  const { tableHeads, tableRows } = useFeedbackTable({
    isFilteringEnabled: true,
    data: data?.feedbacks || [],
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border">
        <DynamicFeedbackTable
          isLoading={isLoading}
          feedbackList={data?.feedbacks || []}
          feedbackLimit={FEEDBACK_PAGE_LIMIT}
          error={error}
          tableHeads={tableHeads}
          tableRows={tableRows}
        />
      </div>

      {data && <ClientPagination limit={data.pagination.pages ?? 1} />}
    </div>
  );
};

export default FeedbackTable;
