import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TABLE_PAGINATION_LIMIT } from "@/constants/constants";

/**
 * Ensures the current page number is within valid bounds and redirects if it is out of range.
 *
 * @param currentPage
 */
export const usePageGuard = (currentPage: number) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (currentPage < 1 || currentPage > TABLE_PAGINATION_LIMIT) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, router, searchParams]);
};
