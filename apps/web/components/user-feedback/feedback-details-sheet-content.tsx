import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { formatCreatedAtDate } from "@/utils/date-utils";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";

import useSWR from "swr";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";
import FeedbackSheetSkeleton from "@/components/user-feedback/feedback-sheet-skeleton";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message, res.status, data);
  }

  return data.data;
};

export default function FeedbackDetailsSheetContent({
  id,
}: {
  id: string | null;
}) {
  const {
    data: feedback,
    error,
    isLoading,
  } = useSWR<SentimentAnalysisResult>(`/api/feedback/${id}`, fetcher, {
    keepPreviousData: true,
  });

  if (error instanceof FetchError) clientAuthGuard(error.status);

  if (error) {
    return (
      <div className="px-8">
        <ErrorUnexpected description="Could not load the feedback details. Please try again later." />
      </div>
    );
  }

  if (isLoading) {
    return <FeedbackSheetSkeleton />;
  }

  if (feedback) {
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
}
