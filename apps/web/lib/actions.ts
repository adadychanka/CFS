"use server";

import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";

export const uploadManualFeedbacks = async (feedbacks: PreviewFeedback[]) => {
  console.log(feedbacks);
};
