import { FAKE_PROCESSED_FEEDBACK } from "@/constants/constants";
import { Sentiment } from "@/types/sentiment-analysis-result";

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
