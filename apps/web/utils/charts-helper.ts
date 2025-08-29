import { FAKE_PROCESSED_FEEDBACK } from "@/constants/constants";
import { Sentiment } from "@/types/sentiment-analysis-result";
import { SentimentSummaryResponse } from "@/types/sentiment-summary";

function getFeedbackCategory(feedbackType: Sentiment) {
  return FAKE_PROCESSED_FEEDBACK.filter(
    (feedback) => feedback.sentiment === feedbackType,
  );
}

//Temporary function until we get API
export function getSentimentsData() {
  const positive = getFeedbackCategory("positive").length;
  const negative = getFeedbackCategory("negative").length;
  const neutral = getFeedbackCategory("neutral").length;
  const unknown = getFeedbackCategory("unknown").length;

  return [positive, negative, neutral, unknown];
}

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
