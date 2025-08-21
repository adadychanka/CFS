import { useMemo } from "react";
import {
  PAGINATION_EDGE_LIMIT,
  PAGINATION_MAX_VISIBLE,
  PAGINATION_WINDOW,
} from "@/constants/constants";

/**
 * Generates a pagination sequence of page numbers and dots for a given current page.
 * The output adapts to the current page and the total number of pages.
 *
 * @param currentPage
 * @param limit
 */
export const usePaginationNumbers = (currentPage: number, limit: number) => {
  return useMemo(() => {
    const pages: (number | "dots")[] = [];

    if (limit <= PAGINATION_MAX_VISIBLE) {
      for (let i = 1; i <= limit; i++) pages.push(i);
    } else {
      for (let page = 1; page <= limit; page++) {
        // Start zone
        if (
          currentPage < PAGINATION_EDGE_LIMIT &&
          page <= PAGINATION_EDGE_LIMIT
        ) {
          pages.push(page);
          continue;
        }

        // Middle zone
        if (
          page >= currentPage - PAGINATION_WINDOW &&
          page <= currentPage + PAGINATION_WINDOW
        ) {
          pages.push(page);
          continue;
        }

        // End zone
        if (
          currentPage > limit - PAGINATION_EDGE_LIMIT + 1 &&
          page > limit - PAGINATION_EDGE_LIMIT
        ) {
          pages.push(page);
          continue;
        }

        // Always include the first and last page
        if (page === 1 || page === limit) {
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
  }, [currentPage, limit]);
};
