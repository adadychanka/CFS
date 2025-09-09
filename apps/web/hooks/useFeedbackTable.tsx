import React, { useCallback, useMemo } from "react";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { TableCell, TableHead, TableRow } from "@repo/ui/components/table";
import { useDynamicTableHeadsAndRows } from "./useDynamicTableHeadsAndRows";
import { formatCreatedAtDate } from "@/utils/date-utils";
import { FeedbackTableFilterDropdown } from "@/components/user-feedback/feedback-table-filter-dropdown";
import { useSampleMode } from "@/providers/sample-mode-provider";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Ellipsis } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FEEDBACK_PANEL_QUERY_KEY } from "@/constants";

type Props = {
  data?: SentimentAnalysisResult[];
  isFilteringEnabled?: boolean;
};

function useFeedbackTable({ data, isFilteringEnabled }: Props) {
  const { isSampleMode } = useSampleMode();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewDetails = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(FEEDBACK_PANEL_QUERY_KEY, id);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

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
      <TableHead key="createdAt" className="w-[100px]">
        Created At
      </TableHead>,
      <TableHead key="see details" className="w-[56px]">
        <span className="sr-only">View details for feedback</span>
      </TableHead>,
    ];
  }, [isFilteringEnabled]);

  const renderRow = useCallback(
    (sentiment: SentimentAnalysisResult) => (
      <TableRow
        key={sentiment.id}
        className="odd:bg-muted/50  hover:bg-muted transition-colors"
      >
        <TableCell className="flex items-center gap-2">
          <span>{sentiment.summary}</span>
          {isSampleMode && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Sample
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center">
          <FeedbackBadge sentiment={sentiment.sentiment} />
        </TableCell>
        <TableCell className="text-center">{sentiment.confidence}%</TableCell>
        <TableCell className="max-w-[300px] truncate" title={sentiment.content}>
          {sentiment.content}
        </TableCell>
        <TableCell>{formatCreatedAtDate(sentiment.createdAt)}</TableCell>
        <TableCell className="flex justify-center pr-2">
          <Button
            className="size-8"
            size="icon"
            variant="outline"
            onClick={() => handleViewDetails(sentiment.id)}
            aria-label="View details for feedback"
          >
            <Ellipsis aria-hidden="true" />
          </Button>
        </TableCell>
      </TableRow>
    ),
    [handleViewDetails, isSampleMode],
  );

  const { tableHeads, tableRows } = useDynamicTableHeadsAndRows({
    data,
    heads,
    renderRow,
  });

  return { tableHeads, tableRows };
}

export default useFeedbackTable;
