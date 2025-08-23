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
import useGroupedSentimentTable from "@/hooks/useGroupedSentimentTable";
import useFeedbackTable from "@/hooks/useFeedbackTable";

type Props = {
  feedbackList: SentimentAnalysisResult[] | GroupedFeedbackDataItems[];
  isLoading: boolean;
  feedbackLimit: number;
  error?: FetchError;
  onRetry?: () => void;
  isGrouped?: boolean;
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  error,
  onRetry,
  isGrouped,
}: Props) {
  const groupedTable = useGroupedSentimentTable({
    data: isGrouped ? (feedbackList as GroupedFeedbackDataItems[]) : [],
  });

  const regularTable = useFeedbackTable({
    data: !isGrouped ? (feedbackList as SentimentAnalysisResult[]) : [],
  });

  const currentTable = isGrouped ? groupedTable : regularTable;

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>{currentTable.tableHeads}</TableRow>
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
          currentTable.tableRows
        )}
      </TableBody>
    </Table>
  );
}

export default DynamicFeedbackTable;
