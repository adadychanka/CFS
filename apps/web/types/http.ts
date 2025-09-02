import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { PaginationMeta } from "@/types/pagination-meta";
import { SuspiciousActivity } from "@/types/suspicious-activity";

export type GetFeedbackResponse = {
  feedbacks: SentimentAnalysisResult[];
  pagination: PaginationMeta;
};

export type GetSuspiciousActivitiesResponse = {
  suspiciousActivities: SuspiciousActivity[];
};
