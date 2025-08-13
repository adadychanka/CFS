import { FAKE_PROCESSED_FEEDBACK } from "@/constants/constants";
import { Sentiment } from "@/shared/sentiment-types";

function getFeedbackCategory(feedback_type: Sentiment) {
  return FAKE_PROCESSED_FEEDBACK.filter(
    (feedback) => feedback.sentiment === feedback_type,
  );
}

//Temporary function until we get API
export function getSentimentsData() {
  const positive = getFeedbackCategory("positive").length;
  const negative = getFeedbackCategory("negative").length;
  const neutral = getFeedbackCategory("neutral").length;
  const unknown = getFeedbackCategory("unknown").length;
  console.log(positive, negative, negative, unknown, FAKE_PROCESSED_FEEDBACK);

  return [positive, negative, neutral, unknown];
}
