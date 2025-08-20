"use client";

import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";

const FeedbackTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState<SentimentAnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/feedback?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}`,
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const result = await response.json();
      setData(result.feedback);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border max-h-[824px]">
        <DynamicFeedbackTable
          isLoading={loading}
          feedbackList={data}
          feedbackLimit={FEEDBACK_PAGE_LIMIT}
          error={error}
          onRetry={fetchData}
        />
      </div>
      <FeedbackTablePagination />
    </div>
  );
};

export default FeedbackTable;
