import { useMemo } from "react";

/**
 * Generates a pagination sequence of page numbers and dots for a given current page.
 * The output adapts to the current page and the total number of pages.
 *
 * @param currentPage
 * @param limit
 */
export const usePaginationNumbers = (currentPage: number, limit: number) => {
  return useMemo(() => {
    const window = 1; // pages around current
    const pages: (number | "dots")[] = [];

    if (limit <= 7) {
      for (let i = 1; i <= limit; i++) pages.push(i);
    } else {
      for (let page = 1; page <= limit; page++) {
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
        if (currentPage > limit - 4 && page >= limit - 4) {
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
  }, [currentPage]);
};
