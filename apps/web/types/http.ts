import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { type User } from "@/types/user";
import { type PaginationMeta } from "@/types/pagination-meta";

export type GetFeedbackResponse = {
  feedbacks: SentimentAnalysisResult[];
  pagination: PaginationMeta;
};

export type GetUsersResponse = {
  users: User[];
  pagination: PaginationMeta;
};
