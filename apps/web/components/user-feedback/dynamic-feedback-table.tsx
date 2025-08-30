import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import { formatCreatedAtDate } from "@/utils/date-utils";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import NoFeedbackMessage from "@/components/user-feedback/no-feedback-message";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { FetchError } from "@/lib/errors";

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

type Props = {
  feedbackList: SentimentAnalysisResult[];
  isLoading: boolean;
  feedbackLimit: number;
  error?: FetchError;
  onRetry?: () => void;
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  error,
  onRetry,
}: Props) {
  const [selectedFeedback, setSelectedFeedback] =
    useState<SentimentAnalysisResult | null>(null);

  return (
    <>
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Summary</TableHead>
            <TableHead className="w-[100px] text-center">Sentiment</TableHead>
            <TableHead className="w-[100px] text-center">Confidence</TableHead>
            <TableHead className="min-w-[200px]">Content</TableHead>
            <TableHead className="w-[120px]">Created At</TableHead>
          </TableRow>
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
            feedbackList.slice(0, feedbackLimit).map((feedback) => (
              <TableRow
                key={feedback.id}
                onClick={() => setSelectedFeedback(feedback)}
                className="odd:bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
              >
                <TableCell>{feedback.summary}</TableCell>
                <TableCell className="text-center">
                  <FeedbackBadge sentiment={feedback.sentiment} />
                </TableCell>
                <TableCell className="text-center">
                  {feedback.confidence}%
                </TableCell>
                <TableCell
                  className="max-w-[300px] truncate"
                  title={feedback.content}
                >
                  {feedback.content}
                </TableCell>
                <TableCell>{formatCreatedAtDate(feedback.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
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
