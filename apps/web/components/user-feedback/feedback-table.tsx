"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FAKE_PROCESSED_FEEDBACK,
  FEEDBACK_PAGE_LIMIT,
  TABLE_PAGINATION_LIMIT,
} from "@/constants/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@repo/ui/components/pagination";
import Link from "next/link";
import {
  PaginationNextWithLink,
  PaginationPreviousWithLink,
} from "@/components/user-feedback/pagination-with-link";
import DynamicFeedbackTable from "./dynamic-feedback-table";

const FeedbackTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  // Redirect if the page is out of bounds
  useEffect(() => {
    if (currentPage < 1 || currentPage > TABLE_PAGINATION_LIMIT) {
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

  // Fake loading time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const paginationNumbers = useMemo(() => {
    const window = 1; // pages around current
    const pages: (number | "dots")[] = [];

    if (TABLE_PAGINATION_LIMIT <= 7) {
      for (let i = 1; i <= TABLE_PAGINATION_LIMIT; i++) pages.push(i);
    } else {
      for (let page = 1; page <= TABLE_PAGINATION_LIMIT; page++) {
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
        if (
          currentPage > TABLE_PAGINATION_LIMIT - 4 &&
          page >= TABLE_PAGINATION_LIMIT - 4
        ) {
          pages.push(page);
          continue;
        }

        // Always include first and last page
        if (page === 1 || page === TABLE_PAGINATION_LIMIT) {
          pages.push(page);
          continue;
        }

        // Fill the dots
        if (pages[pages.length - 1] !== "dots") {
          pages.push("dots");
        }
      }
    }

    return pages;
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border max-h-[824px]">
        <DynamicFeedbackTable
          isLoading={isLoading}
          feedbackList={FAKE_PROCESSED_FEEDBACK}
          feedbackLimit={FEEDBACK_PAGE_LIMIT}
        />
      </div>
      {TABLE_PAGINATION_LIMIT > 1 && (
        <Pagination>
          <PaginationContent className="mt-4 flex justify-center gap-1">
            <PaginationPreviousWithLink
              href={getPageLink(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {paginationNumbers.map((p, idx) =>
              p === "dots" ? (
                <span
                  key={`dots-${idx}`}
                  aria-hidden="true"
                  className="min-w-9 min-h-9 text-center"
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
            )}

            <PaginationNextWithLink
              href={getPageLink(currentPage + 1)}
              disabled={currentPage === TABLE_PAGINATION_LIMIT}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FeedbackTable;
