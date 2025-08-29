import { FEEDBACK_FILTERS } from "@/constants/constants";
import { type NextRequest } from "next/server";

export function getPaginationParamsFromNextRequest(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const page = Number(search.get("page")) || 1;
  const limit = Number(search.get("limit")) || 20;
  return { page, limit };
}

export const parseSentimentsQueryParam = (
  searchParams: URLSearchParams,
): string[] => {
  return (
    searchParams
      .get("sentiment")
      ?.split(",")
      .filter((f) => FEEDBACK_FILTERS.includes(f)) || []
  );
};

export const transformSentimentsIntoSearchParams = (
  sentiments: string[],
): URLSearchParams => {
  const params = new URLSearchParams();
  sentiments.forEach((s) => params.append("sentiment", s));
  return params;
};

export function updateSearchParamsWithSentiments(
  baseParams: URLSearchParams,
  sentiments: string[],
): URLSearchParams {
  const params = new URLSearchParams(baseParams);
  if (sentiments.length > 0) {
    params.set("sentiment", sentiments.join(","));
  } else {
    params.delete("sentiment");
  }
  return params;
}
