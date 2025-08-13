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
  const totalPages = 30;
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

  const renderPageNumbers = () => {
    const window = 1; // pages around current
    const pages: (number | "dots")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let page = 1; page <= totalPages; page++) {
        // Start zone
        if (currentPage < 5 && page <= 5) {
          pages.push(page);
          continue;
        }

        // Middle zone
        if (page >= currentPage - window && page <= currentPage + window) {
          pages.push(page);
          continue;
        }

        // End zone
        if (currentPage > totalPages - 4 && page >= totalPages - 4) {
          pages.push(page);
          continue;
        }

        // Always include first and last page
        if (page === 1 || page === totalPages) {
          pages.push(page);
          continue;
        }

        // Fill the dots
        if (pages[pages.length - 1] !== "dots") {
          pages.push("dots");
        }
      }
    }

    return pages.map((p, idx) =>
      p === "dots" ? (
        <span
          key={`dots-${idx}`}
          aria-hidden="true"
          className="size-9 text-center"
        >
          …
        </span>
      ) : (
        <PaginationLink
          key={p}
          isActive={currentPage === p}
          asChild
          aria-label={`Go to page ${p}`}
        >
          <Link href={getPageLink(p)} scroll={false}>
            {p}
          </Link>
        </PaginationLink>
      ),
    );
  };

  return (
    <div className="flex flex-col gap-8">
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
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <PaginationPreviousWithLink
            asChild
            href={getPageLink(currentPage - 1)}
          />

          {renderPageNumbers()}

          <PaginationNextWithLink href={getPageLink(currentPage + 1)} />
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
