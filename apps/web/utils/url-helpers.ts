import { FEEDBACK_FILTERS } from "@/constants/constants";
import { type NextRequest } from "next/server";
import { SENTIMENT_FILTER_QUERY_KEY } from "@/constants";

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
      .get(SENTIMENT_FILTER_QUERY_KEY)
      ?.split(",")
      .filter((f) => FEEDBACK_FILTERS.includes(f)) || []
  );
};

export const transformSentimentsIntoSearchParams = (
  sentiments: string[],
): URLSearchParams => {
  const params = new URLSearchParams();
  sentiments.forEach((s) => params.append(SENTIMENT_FILTER_QUERY_KEY, s));
  return params;
};

/**
 * Updates a query parameter in a URLSearchParams object.
 * - If `value` is a string, sets the param if non-empty, otherwise deletes it.
 * - If `value` is an array of strings, sets the param as a comma-separated string if non-empty, otherwise deletes it.
 *
 * @param baseParams - The current URLSearchParams object to update.
 * @param key - The query parameter key to update or delete.
 * @param value - The value to set. Can be a string or an array of strings.
 * @returns A new URLSearchParams object with the updated parameter.
 *
 * @example
 * // Update search param
 * const params = updateSearchParams(searchParams, "search", "hello");
 *
 * @example
 * // Update sentiments param with multiple values
 * const params = updateSearchParams(searchParams, "sentiments", ["positive", "neutral"]);
 *
 * @example
 * // Delete param by passing empty string or empty array
 * const params = updateSearchParams(searchParams, "search", "");
 * const params2 = updateSearchParams(searchParams, "sentiments", []);
 */
export function updateSearchParams(
  baseParams: URLSearchParams,
  key: string,
  value: string | string[],
): URLSearchParams {
  const params = new URLSearchParams(baseParams);

  if (Array.isArray(value)) {
    if (value.length > 0) {
      params.set(key, value.join(","));
    } else {
      params.delete(key);
    }
  } else {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  return params;
}

export function getIsSampleMode(req: NextRequest): boolean {
  return req.nextUrl.searchParams.get("isSampleMode") === "true";
}
