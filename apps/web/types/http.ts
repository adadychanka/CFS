import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { PaginationMeta } from "@/types/pagination-meta";

export type getFeedbackResponse = {
  data: SentimentAnalysisResult[];
  pagination: PaginationMeta;
};

export class FetchError extends Error {
  status: number;
  info?: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}
