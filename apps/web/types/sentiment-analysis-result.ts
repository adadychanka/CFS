export type Sentiment = "positive" | "neutral" | "negative" | "unknown";

export type SentimentAnalysisResult = {
  content: string;
  sentiment: Sentiment;
  confidence: number;
  summary: string;
  userId: string;
  fileId: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type SentimentAnalysisGroup = {
  id: string;
  groupName: string;
  items: SentimentAnalysisResult[];
};
