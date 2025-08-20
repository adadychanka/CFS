"use client";

import useSWR from "swr";
import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { useSearchParams } from "next/navigation";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

const FeedbackTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, error, isLoading, mutate } = useSWR<{
    feedback: SentimentAnalysisResult[];
  }>(`/api/feedback?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}`, fetcher);

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border max-h-[824px]">
        <DynamicFeedbackTable
          isLoading={isLoading}
          feedbackList={data?.feedback || []}
          feedbackLimit={FEEDBACK_PAGE_LIMIT}
          error={error?.message || null}
          onRetry={() => mutate()}
        />
      </div>
      <FeedbackTablePagination />
    </div>
  );
};

export default FeedbackTable;
