import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { formatCreatedAtDate } from "@/utils/date-utils";
import FeedbackBadge from "@/components/user-feedback/feedback-badge";

import useSWR from "swr";
import { FetchError } from "@/lib/errors";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { Skeleton } from "@repo/ui/components/skeleton";
import { AlertTriangle } from "lucide-react";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message, res.status, data);
  }

  return data;
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
      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-4 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <p className="text-lg font-semibold text-red-600">
          Something went wrong
        </p>
        <p className="text-sm text-gray-500">
          {error?.message ||
            "We couldn’t load the content. Please try again later."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-6 space-y-6">
        <div className="space-y-1">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-5 w-3/4 bg-gray-200" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-5 w-12 bg-gray-200" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-5 w-full bg-gray-200" />
          <Skeleton className="h-5 w-10/12 bg-gray-200" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-5 w-32 bg-gray-200" />
        </div>
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="mx-6 space-y-6">
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
