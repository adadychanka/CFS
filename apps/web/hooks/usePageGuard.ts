import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Ensures the current page number is within valid bounds and redirects if it is out of range.
 *
 * @param currentPage
 * @param limit
 */
export const usePageGuard = (currentPage: number, limit: number) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (currentPage < 1 || currentPage > limit) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, limit, router, searchParams]);
};
