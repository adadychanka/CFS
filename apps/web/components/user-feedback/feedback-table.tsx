"use client";

import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const FeedbackTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState([]);
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

      const processed = result.feedback.products.map(
        (el: {
          id: number;
          title: string;
          description: string;
          stock: number;
        }) => ({
          id: el.id,
          summary: el.title,
          content: el.description,
          sentiment: "unknown",
          confidence: el.stock,
          created_at: "2024-11-01T11:24:29.176905",
        }),
      );

      setData(processed);
    } catch (err: unknown) {
      console.error(err);
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
