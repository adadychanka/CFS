"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import {
  FAKE_PROCESSED_FEEDBACK,
  FEEDBACK_PAGE_LIMIT,
} from "@/constants/constants";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import { formatDatebyYearMonthDays } from "@/utils/dateUtils";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import NoFeedbackMessage from "@/components/user-feedback/no-feedback-message";

const FeedbackTable = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="overflow-x-auto rounded-md border max-h-[824px]">
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
            [...Array(FEEDBACK_PAGE_LIMIT)].map((_, i) => (
              <SkeletonFeedbackItem key={i} />
            ))
          ) : FAKE_PROCESSED_FEEDBACK.length === 0 ? (
            <NoFeedbackMessage />
          ) : (
            FAKE_PROCESSED_FEEDBACK.slice(0, FEEDBACK_PAGE_LIMIT).map((fd) => (
              <TableRow key={fd.id} className="odd:bg-muted/50">
                <TableCell>{fd.summary}</TableCell>
                <TableCell className="text-center">
                  <FeedbackBadge sentiment={fd.sentiment} />
                </TableCell>
                <TableCell className="text-center">{fd.confidence}%</TableCell>
                <TableCell
                  className="max-w-[300px] truncate"
                  title={fd.content}
                >
                  {fd.content}
                </TableCell>
                <TableCell>
                  {formatDatebyYearMonthDays(fd.created_at)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeedbackTable;
