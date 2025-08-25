"use client";

import useSWR from "swr";
import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { type GetFeedbackResponse } from "@/types/http";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { Button } from "@repo/ui/components/button";
import { SwatchBook } from "lucide-react";
import { useState } from "react";

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

type Props = {
  currentPage: number;
  // isSampleMode: boolean;
};

const FeedbackTable = ({ currentPage }: Props) => {
  const [isSampleMode, setIsSampleMode] = useState(false);

  const fetchURL = isSampleMode
    ? `/api/feedback/sample?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}`
    : `/api/feedback?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}`;
  const { data, error, isLoading, mutate } = useSWR<GetFeedbackResponse>(
    fetchURL,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  return (
    <div className="flex flex-col gap-8">
      <div className="pb-8 flex justify-end">
        <Button
          size="sm"
          variant="outline"
          aria-label="Toggle sample mode for user dashboard"
          className={isSampleMode ? "border-green-500" : "border-neutral-200"}
          onClick={() => setIsSampleMode((prev) => !prev)}
        >
          <SwatchBook /> Sample mode
        </Button>
      </div>

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
