"use client";

import PortalSheet from "@repo/ui/components/portal-sheet";
import { useRouter, useSearchParams } from "next/navigation";
import { FEEDBACK_PANEL_QUERY_KEY } from "@/constants";
import { FetchError } from "@/lib/errors";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import useSWR from "swr";
import FeedbackDetailsSheetContent from "@/features/feedback-panel/feedback-panel-details";
import { useCallback, useEffect } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message, res.status, data);
  }

  return data.data;
};

const FeedbackPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const feedbackId = searchParams.get(FEEDBACK_PANEL_QUERY_KEY);

  const {
    data: feedback,
    error,
    isLoading,
  } = useSWR<SentimentAnalysisResult>(
    feedbackId ? `/api/feedback/${feedbackId}` : null,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    clientAuthGuard(error);
  }, [error]);

  const handlePanelChange = useCallback(
    (isPanelOpen: boolean) => {
      if (!isPanelOpen) {
        const params = new URLSearchParams(searchParams);
        params.delete(FEEDBACK_PANEL_QUERY_KEY);

        router.replace(`?${params.toString()}`, { scroll: false });
      }
    },
    [router, searchParams],
  );

  return (
    <PortalSheet
      title="Feedback Details"
      isOpen={!!feedbackId}
      setIsOpen={handlePanelChange}
    >
      <FeedbackDetailsSheetContent
        feedback={feedback}
        isLoading={isLoading}
        error={error}
      />
    </PortalSheet>
  );
};

export default FeedbackPanel;
