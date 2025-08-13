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
import { formatDateByYearMonthDays } from "@/utils/dateUtils";
import SkeletonFeedbackItem from "@/components/user-feedback/skeleton-feedback-item";
import NoFeedbackMessage from "@/components/user-feedback/no-feedback-message";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationLink } from "@repo/ui/components/pagination";
import Link from "next/link";
import {
  PaginationNextWithLink,
  PaginationPreviousWithLink,
} from "@/components/user-feedback/pagination-with-link";

const FeedbackTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const totalPages = 10;
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  // Redirect if the page is out of bounds
  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, router, searchParams]);

  const getPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <PaginationPreviousWithLink
            asChild
            href={getPageLink(currentPage - 1)}
          />

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <PaginationLink key={num} isActive={currentPage === num} asChild>
              <Link href={getPageLink(num)}>{num}</Link>
            </PaginationLink>
          ))}

          <PaginationNextWithLink href={getPageLink(currentPage + 1)} />
        </div>
      )}
      <div className="overflow-x-auto rounded-md border max-h-[824px]">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Summary</TableHead>
              <TableHead className="w-[100px] text-center">Sentiment</TableHead>
              <TableHead className="w-[100px] text-center">
                Confidence
              </TableHead>
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
              FAKE_PROCESSED_FEEDBACK.slice(0, FEEDBACK_PAGE_LIMIT).map(
                (fd) => (
                  <TableRow key={fd.id} className="odd:bg-muted/50">
                    <TableCell>{fd.summary}</TableCell>
                    <TableCell className="text-center">
                      <FeedbackBadge sentiment={fd.sentiment} />
                    </TableCell>
                    <TableCell className="text-center">
                      {fd.confidence}%
                    </TableCell>
                    <TableCell
                      className="max-w-[300px] truncate"
                      title={fd.content}
                    >
                      {fd.content}
                    </TableCell>
                    <TableCell>
                      {formatDateByYearMonthDays(fd.created_at)}
                    </TableCell>
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeedbackTable;
