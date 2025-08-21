import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { PaginationMeta } from "@/types/pagination-meta";

export type GetFeedbackResponse = {
  feedbacks: SentimentAnalysisResult[];
  pagination: PaginationMeta;
};
