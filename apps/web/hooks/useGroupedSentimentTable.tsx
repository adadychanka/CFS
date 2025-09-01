import React, { useCallback, useMemo } from "react";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import type { Sentiment } from "@/types/sentiment-analysis-result";
import { TableCell, TableHead, TableRow } from "@repo/ui/components/table";
import { useDynamicTableHeadsAndRows } from "./useDynamicTableHeadsAndRows";
import { Badge } from "@repo/ui/components/badge";
import { useSampleMode } from "@/context/use-sample-mode";

type Props = {
  data: GroupedFeedbackDataItems[];
};

function useGroupedSentimentTable({ data }: Props) {
  const { isSampleMode } = useSampleMode();
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
        <TableCell
          className="flex items-center gap-2 truncate"
          title={sentiment.content}
        >
          <span>{sentiment.content}</span>
          {isSampleMode && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Sample
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center">
          <FeedbackBadge sentiment={sentiment.sentiment as Sentiment} />
        </TableCell>
      </TableRow>
    ),
    [isSampleMode],
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
