"use client";

import useSWR from "swr";
import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { useSearchParams } from "next/navigation";
import { type getFeedbackResponse } from "@/types/http";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(
      data.message || "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
};

const FeedbackTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading, mutate } = useSWR<getFeedbackResponse>(
    `/api/feedback?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border max-h-[824px]">
        <DynamicFeedbackTable
          isLoading={isLoading}
          feedbackList={data?.feedbacks || []}
          feedbackLimit={FEEDBACK_PAGE_LIMIT}
          error={error}
          onRetry={() => mutate()}
        />
      </div>

      {data && <FeedbackTablePagination limit={data.pagination.pages | 0} />}
    </div>
  );
};

export default FeedbackTable;
