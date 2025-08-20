"use client";

import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@repo/ui/components/pagination";
import {
  PaginationNextWithLink,
  PaginationPreviousWithLink,
} from "@/components/user-feedback/pagination-with-link";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePaginationNumbers } from "@/hooks/usePaginationNumbers";
import { usePageGuard } from "@/hooks/usePageGuard";
import { getPageLink } from "@/utils/get-page-link";

type Props = {
  limit: number;
};

const FeedbackTablePagination = ({ limit }: Props) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  usePageGuard(currentPage, limit);
  const paginationNumbers = usePaginationNumbers(currentPage, limit);

  return (
    <>
      {limit > 1 && (
        <Pagination>
          <PaginationContent className="mt-4 flex justify-center gap-1">
            <PaginationPreviousWithLink
              href={getPageLink(searchParams, currentPage - 1)}
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
                  <Link href={getPageLink(searchParams, p)} scroll={false}>
                    {p}
                  </Link>
                </PaginationLink>
              ),
            )}

            <PaginationNextWithLink
              href={getPageLink(searchParams, currentPage + 1)}
              disabled={currentPage === limit}
            />
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default FeedbackTablePagination;
