import DynamicFeedbackTable from "@/components/user-feedback/dynamic-feedback-table";
import type { GroupedFeedbackDataItems } from "@/types/grouped-feedback";
import Link from "next/link";
import React from "react";

type Props = {
  data: GroupedFeedbackDataItems[];
  summary: string;
};

const FEEDBACK_LIMIT = 10;

function SingleGroupedSentiments({ data, summary }: Props) {
  return (
    <>
      <DynamicFeedbackTable
        isLoading={false}
        feedbackList={data}
        feedbackLimit={FEEDBACK_LIMIT}
        isGrouped={true}
      />
      {data.length >= FEEDBACK_LIMIT && (
        <Link
          href={`/result/${summary}`}
          className="px-5 py-2 inline-block my-2 rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        >
          View all results
        </Link>
      )}
    </>
  );
}

export default SingleGroupedSentiments;
