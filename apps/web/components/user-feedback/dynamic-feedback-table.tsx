import React from "react";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import NoFeedbackMessage from "@/components/user-feedback/no-feedback-message";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { FetchError } from "@/lib/errors";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import { UseDynamicTableData } from "@/hooks/useDynamicTableHeadsAndRows";

type Props = {
  feedbackList: SentimentAnalysisResult[] | GroupedFeedbackDataItems[];
  isLoading: boolean;
  feedbackLimit: number;
  error?: FetchError;
  onRetry?: () => void;
  tableHeads: UseDynamicTableData["tableHeads"];
  tableRows: UseDynamicTableData["tableRows"];
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  error,
  onRetry,
  tableHeads,
  tableRows,
}: Props) {

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>{tableHeads}</TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          [...Array(feedbackLimit)].map((_, i) => (
            <SkeletonFeedbackItem key={i} />
          ))
        ) : error ? (
          <NoFeedbackMessage type="error" onRetry={onRetry} />
        ) : feedbackList.length === 0 ? (
          <NoFeedbackMessage type="empty" />
        ) : (
          tableRows
        )}
      </TableBody>
    </Table>
  );
}

export default DynamicFeedbackTable;
