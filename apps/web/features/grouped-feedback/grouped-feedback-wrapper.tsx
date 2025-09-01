import React from "react";
import useSWR from "swr";
import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import type { GroupedFeedbackResponse } from "@/types/grouped-feedback";
import GroupedFeedbackContent from "./grouped-feedback-content";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { useSampleMode } from "@/providers/sample-mode-provider";

export const fetcher = async (url: string) => {
  const res = await clientApi.get(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(
      data.message || "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
};

function GroupedFeedback() {
  const { isSampleMode } = useSampleMode();

  const {
    data: result,
    error,
    isLoading,
  } = useSWR<GroupedFeedbackResponse>(
    `/api/feedback/grouped?isSampleMode=${isSampleMode}`,
    fetcher,
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  return (
    <>
      <GroupedFeedbackContent
        isLoading={isLoading}
        error={error}
        data={result?.data}
      />
    </>
  );
}

export default GroupedFeedback;
