import { FEEDBACK_FILTERS } from "@/constants/constants";
import { type NextRequest } from "next/server";
import { SENTIMENT_QUERY_PARAM_VALUE } from "@/constants";

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
      .get(SENTIMENT_QUERY_PARAM_VALUE)
      ?.split(",")
      .filter((f) => FEEDBACK_FILTERS.includes(f)) || []
  );
};

export const transformSentimentsIntoSearchParams = (
  sentiments: string[],
): URLSearchParams => {
  const params = new URLSearchParams();
  sentiments.forEach((s) => params.append(SENTIMENT_QUERY_PARAM_VALUE, s));
  return params;
};

export function updateSearchParamsWithSentiments(
  baseParams: URLSearchParams,
  sentiments: string[],
): URLSearchParams {
  const params = new URLSearchParams(baseParams);
  if (sentiments.length > 0) {
    params.set(SENTIMENT_QUERY_PARAM_VALUE, sentiments.join(","));
  } else {
    params.delete(SENTIMENT_QUERY_PARAM_VALUE);
  }
  return params;
}
