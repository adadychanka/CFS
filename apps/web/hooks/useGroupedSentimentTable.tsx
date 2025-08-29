import React, { useCallback, useMemo } from "react";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import type { Sentiment } from "@/types/sentiment-analysis-result";
import { TableCell, TableHead, TableRow } from "@repo/ui/components/table";
import { useDynamicTableHeadsAndRows } from "./useDynamicTableHeadsAndRows";

type Props = {
  data: GroupedFeedbackDataItems[];
};

function useGroupedSentimentTable({ data }: Props) {
  const heads = useMemo(() => {
    return [
      <TableHead key={"content"} className="min-w-[200px]">
        Content
      </TableHead>,
      <TableHead key={"sentiment"} className="w-[100px] text-center">
        Sentiment
      </TableHead>,
    ];
  }, []);

  const renderRow = useCallback(
    (sentiment: GroupedFeedbackDataItems) => (
      <TableRow key={sentiment.id} className="odd:bg-muted/50">
        <TableCell className="max-w-[300px] truncate" title={sentiment.content}>
          {sentiment.content}
        </TableCell>
        <TableCell className="text-center">
          <FeedbackBadge sentiment={sentiment.sentiment as Sentiment} />
        </TableCell>
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
  };
}

export default useGroupedSentimentTable;
