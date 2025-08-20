import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { PaginationMeta } from "@/types/pagination-meta";

export type getFeedbackResponse = {
  feedbacks: SentimentAnalysisResult[];
  pagination: PaginationMeta;
};

export class FetchError {}
