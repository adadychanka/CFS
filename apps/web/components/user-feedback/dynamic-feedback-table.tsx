import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { FetchError } from "@/lib/errors";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import { UseDynamicTableData } from "@/hooks/useDynamicTableHeadsAndRows";
import useTableBody from "@/hooks/useTableBody";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import { Button } from "@repo/ui/components/button";
import FeedbackDetailsSheetContent from "./feedback-details-sheet-content";

export type DynamicTableProps = {
  feedbackList: SentimentAnalysisResult[] | GroupedFeedbackDataItems[];
  isLoading: boolean;
  feedbackLimit: number;
  isFilteringEnabled?: boolean;
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
  tableHeads,
  tableRows,
  onRetry,
}: DynamicTableProps) {
  const content = useTableBody({
    feedbackLimit,
    feedbackList,
    isLoading,
    tableRows,
    tableHeads,
    error,
    onRetry,
  });
  const [selectedFeedback, setSelectedFeedback] =
    useState<SentimentAnalysisResult | null>(null);

  return (
    <>
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>{tableHeads}</TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>

      <Sheet
        open={!!selectedFeedback}
        onOpenChange={(val) => !val && setSelectedFeedback(null)}
      >
        <SheetContent className="w-11/12 sm:w-[500px] gap-0">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">
              Feedback Details
            </SheetTitle>
            <SheetDescription>
              Full details of the selected user feedback.
            </SheetDescription>
          </SheetHeader>

          {selectedFeedback && (
            <FeedbackDetailsSheetContent id={selectedFeedback.id} />
          )}

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="w-full cursor-pointer">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default DynamicFeedbackTable;
