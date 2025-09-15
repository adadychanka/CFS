import { SentimentSummaryResponse } from "@/types/sentiment-summary";

export function transformSentimentSummaryResult(
  result?: SentimentSummaryResponse,
) {
  const items = result?.data ?? [];
  const categories = items.map((item) => item.sentiment);
  const data = items.map((item) => ({
    value: item.count,
    name: item.sentiment,
  }));

  return { categories, data };
}
