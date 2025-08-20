import React from "react";

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
import { FetchError } from "@/types/http";

type Props = {
  feedbackList: SentimentAnalysisResult[];
  isLoading: boolean;
  feedbackLimit: number;
  error?: FetchError | null;
  onRetry?: () => void;
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
  error,
  onRetry,
}: Props) {
  return (
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
            <TableRow key={feedback.id} className="odd:bg-muted/50">
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
  );
}

export default DynamicFeedbackTable;
