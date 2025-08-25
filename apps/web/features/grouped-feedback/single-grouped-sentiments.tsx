import DynamicFeedbackTable from "@/components/user-feedback/dynamic-feedback-table";
import useGroupedSentimentTable from "@/hooks/useGroupedSentimentTable";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import { capitalizeSentence } from "@/utils/capitilize";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import Link from "next/link";
import React from "react";

type Props = {
  data: GroupedFeedbackDataItems[];
  summary: string;
  isLoading: boolean;
};

const FEEDBACK_LIMIT = 10;

function SingleGroupedSentiments({ data, summary, isLoading }: Props) {
  const { tableHeads, tableRows } = useGroupedSentimentTable({ data });

  return (
    <AccordionItem key={summary} value={summary}>
      <AccordionTrigger>{capitalizeSentence(summary)}</AccordionTrigger>
      <AccordionContent>
        <DynamicFeedbackTable
          isLoading={isLoading}
          feedbackList={data}
          feedbackLimit={FEEDBACK_LIMIT}
          tableHeads={tableHeads}
          tableRows={tableRows}
        />
        {data.length >= FEEDBACK_LIMIT && (
          <Link
            href={`/result/${summary}`}
            className="px-5 py-2 inline-block my-2 rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            View all results
          </Link>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default SingleGroupedSentiments;
