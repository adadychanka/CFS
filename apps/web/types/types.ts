export type Feedback = {
  id: string;
  content: string;
  sentiment: "positive" | "neutral" | "negative" | "unknown";
  confidence: number;
  summary: string;
  created_at: string;
};

export type GroupedFeedback = {
  id: string;
  groupName: string;
  items: Feedback[];
};
