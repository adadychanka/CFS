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
import { formatDateByYearMonthDays } from "@/utils/dateUtils";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import NoFeedbackMessage from "@/components/user-feedback/no-feedback-message";
import { Feedback } from "@/types/types";

type Props = {
  feedbackList: Feedback[];
  isLoading: boolean;
  feedbackLimit: number;
};

function DynamicFeedbackTable({
  feedbackList,
  isLoading,
  feedbackLimit,
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
        ) : feedbackList.length === 0 ? (
          <NoFeedbackMessage />
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
              <TableCell>
                {formatDateByYearMonthDays(feedback.created_at)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default DynamicFeedbackTable;
