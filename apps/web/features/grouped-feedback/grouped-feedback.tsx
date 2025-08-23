import React from "react";
import useSWR from "swr";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import DynamicFeedbackTable from "@/components/user-feedback/dynamic-feedback-table";
import { clientApi } from "@/lib/api";
import { FetchError } from "@/lib/errors";
import { type GroupedFeedbackResponse } from "@/types/grouped-feedback";
import GroupedFeedbackFallback from "./grouped-feedback-fallback";
import { capitalizeSentence } from "@/utils/capitilize";
import { clientAuthGuard } from "@/utils/client-auth-guard";

const FEEDBACK_LIMIT = 10;

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
          <AccordionItem key={group.summary} value={group.summary}>
            <AccordionTrigger>
              {capitalizeSentence(group.summary)}
            </AccordionTrigger>
            <AccordionContent>
              <DynamicFeedbackTable
                isLoading={isLoading}
                feedbackList={group.items}
                feedbackLimit={FEEDBACK_LIMIT}
                isGrouped
              />
              {group.items.length >= FEEDBACK_LIMIT && (
                <Link
                  href={`/result/${group.summary}`}
                  className="px-5 py-2 inline-block my-2 rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                >
                  View all results
                </Link>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default GroupedFeedback;
