"use client";

import PortalSheet from "@repo/ui/components/portal-sheet";
import { useRouter, useSearchParams } from "next/navigation";
import { FEEDBACK_PANEL_QUERY_KEY } from "@/constants";
import { FetchError } from "@/lib/errors";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import useSWR from "swr";
import FeedbackDetailsSheetContent from "@/features/feedback-panel/feedback-panel-details";
import { useCallback, useEffect } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { createWorkspaceUrl } from "@/lib/create-workspace-url";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(data.message, res.status, data);
  }

  return data.data;
};

const FeedbackPanel = ({ workspaceId }: { workspaceId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const feedbackId = searchParams.get(FEEDBACK_PANEL_QUERY_KEY);
  const url = createWorkspaceUrl(workspaceId, `/single-feedback/${feedbackId}`);

  const {
    data: feedback,
    error,
    isLoading,
  } = useSWR<SentimentAnalysisResult>(feedbackId ? url : null, fetcher, {
    keepPreviousData: true,
  });

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
      onOpenChange={handlePanelChange}
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
