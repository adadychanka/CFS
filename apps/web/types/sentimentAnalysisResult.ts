export type Sentiment = "positive" | "neutral" | "negative" | "unknown";

export type SentimentAnalysisResult = {
  id: string;
  content: string;
  sentiment: Sentiment;
  confidence: number;
  summary: string;
  created_at: string;
};

export type SentimentAnalysisGroup = {
  id: string;
  groupName: string;
  items: SentimentAnalysisResult[];
};
