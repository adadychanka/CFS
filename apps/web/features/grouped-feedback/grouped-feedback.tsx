import React from "react";
import useSWR from "swr";
import { Accordion } from "@repo/ui/components/accordion";
import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import { type GroupedFeedbackResponse } from "@/types/grouped-feedback";
import GroupedFeedbackFallback from "./grouped-feedback-fallback";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import SingleGroupedSentiments from "./single-grouped-sentiments";

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
  const {
    data: result,
    error,
    isLoading,
  } = useSWR<GroupedFeedbackResponse>("/api/feedback/grouped", fetcher);

  if (error instanceof FetchError) clientAuthGuard(error.status);

  if (isLoading) {
    return <GroupedFeedbackFallback loading />;
  }

  if (error) {
    return <GroupedFeedbackFallback error />;
  }

  if (result?.data?.length === 0) {
    return <GroupedFeedbackFallback empty />;
  }

  return (
    <Accordion type="single" className="w-full" collapsible>
      {result?.data.map((group) => {
        return (
          <SingleGroupedSentiments
            key={group.summary}
            data={group.items}
            isLoading={isLoading}
            summary={group.summary}
          />
        );
      })}
    </Accordion>
  );
}

export default GroupedFeedback;
