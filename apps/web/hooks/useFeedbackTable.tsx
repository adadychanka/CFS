import React, { useCallback, useMemo, useState } from "react";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { TableCell, TableHead, TableRow } from "@repo/ui/components/table";
import { useDynamicTableHeadsAndRows } from "./useDynamicTableHeadsAndRows";
import { formatCreatedAtDate } from "@/utils/date-utils";
import { FeedbackTableFilterDropdown } from "@/components/user-feedback/feedback-table-filter-dropdown";

type Props = {
  data?: SentimentAnalysisResult[];
  isFilteringEnabled?: boolean;
};

function useFeedbackTable({ data, isFilteringEnabled }: Props) {
  const [selectedFeedback, setSelectedFeedback] =
    useState<SentimentAnalysisResult | null>(null);

  const unselectFeedback = useCallback(() => {
    setSelectedFeedback(null);
  }, []);

  const heads = useMemo(() => {
    return [
      <TableHead key="summary" className="w-[300px]">
        Summary
      </TableHead>,
      <TableHead key="sentiment" className="w-[100px] text-center">
        {isFilteringEnabled ? <FeedbackTableFilterDropdown /> : "Sentiment"}
      </TableHead>,
      <TableHead key="confidence" className="w-[100px] text-center">
        Confidence
      </TableHead>,
      <TableHead key="content" className="min-w-[200px]">
        Content
      </TableHead>,
      <TableHead key="createdAt" className="w-[120px]">
        Created At
      </TableHead>,
    ];
  }, [isFilteringEnabled]);

  const renderRow = useCallback(
    (sentiment: SentimentAnalysisResult) => (
      <TableRow
        key={sentiment.id}
        onClick={() => setSelectedFeedback(sentiment)}
        className="odd:bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
      >
        <TableCell>{sentiment.summary}</TableCell>
        <TableCell className="text-center">
          <FeedbackBadge sentiment={sentiment.sentiment} />
        </TableCell>
        <TableCell className="text-center">{sentiment.confidence}%</TableCell>
        <TableCell className="max-w-[300px] truncate" title={sentiment.content}>
          {sentiment.content}
        </TableCell>
        <TableCell>{formatCreatedAtDate(sentiment.createdAt)}</TableCell>
      </TableRow>
    ),
    [],
  );

  const { tableHeads, tableRows } = useDynamicTableHeadsAndRows({
    data,
    heads,
    renderRow,
  });

  return {
    tableHeads,
    tableRows,
    selectedItemId: selectedFeedback?.id,
    onUnselectItem: unselectFeedback,
  };
}

export default useFeedbackTable;
