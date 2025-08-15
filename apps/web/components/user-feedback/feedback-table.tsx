"use client";

import { useEffect, useState } from "react";
import {
  FAKE_PROCESSED_FEEDBACK,
  FEEDBACK_PAGE_LIMIT,
} from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import FeedbackTablePagination from "@/components/user-feedback/feedback-table-pagination";

const FeedbackTable = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Fake loading time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border max-h-[824px]">
        <DynamicFeedbackTable
          isLoading={isLoading}
          feedbackList={FAKE_PROCESSED_FEEDBACK}
          feedbackLimit={FEEDBACK_PAGE_LIMIT}
        />
      </div>
      <FeedbackTablePagination />
    </div>
  );
};

export default FeedbackTable;
