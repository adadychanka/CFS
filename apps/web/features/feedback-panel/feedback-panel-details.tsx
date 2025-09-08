import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { formatCreatedAtDate } from "@/utils/date-utils";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import FeedbackPanelSkeleton from "@/features/feedback-panel/feedback-panel-skeleton";

type Props = {
  feedback: SentimentAnalysisResult | undefined;
  isLoading: boolean;
  error: unknown;
};

export default function FeedbackDetailsSheetContent({
  feedback,
  isLoading,
  error,
}: Props) {
  if (isLoading) {
    return <FeedbackPanelSkeleton />;
  }

  if (error || !feedback) {
    return (
      <div className="px-8">
        <ErrorUnexpected description="Could not load the feedback details. Please try again later." />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Summary</p>
        <p className="font-medium">{feedback.summary}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Sentiment</p>
        <FeedbackBadge sentiment={feedback.sentiment} />
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Confidence</p>
        <p className="font-medium">{feedback.confidence}%</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Content</p>
        <p className="text-base">{feedback.content}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Created At</p>
        <p className="font-base">{formatCreatedAtDate(feedback.createdAt)}</p>
      </div>
    </div>
  );
}
