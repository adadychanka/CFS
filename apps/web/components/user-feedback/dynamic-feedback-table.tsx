import React, { ReactNode } from "react";
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

export type DynamicTableProps = {
  feedbackList: SentimentAnalysisResult[] | GroupedFeedbackDataItems[];
  isLoading: boolean;
  feedbackLimit: number;
  isFilteringEnabled?: boolean;
  error?: FetchError;
  onRetry?: () => void;
  tableHeads: UseDynamicTableData["tableHeads"];
  tableRows: UseDynamicTableData["tableRows"];
  sheet?: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    content: ReactNode;
  };
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  error,
  tableHeads,
  tableRows,
  onRetry,
  sheet,
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

  return (
    <>
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>{tableHeads}</TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>

      {sheet && (
        <Sheet
          open={sheet.isOpen}
          onOpenChange={(val) => !val && sheet.onClose()}
        >
          <SheetContent className="w-11/12 sm:w-[500px]">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                {sheet.title}
              </SheetTitle>
              <SheetDescription>{sheet.description}</SheetDescription>
            </SheetHeader>

            {sheet.content}

            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" className="w-full cursor-pointer">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

export default DynamicFeedbackTable;
