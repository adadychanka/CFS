import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { GROUPED_FEEDBACK_DATA } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";
import Link from "next/link";

const FEEDBACK_LIMIT = 10;

const GroupedFeedback = () => {
  return (
    <Accordion type="single" className="w-full" collapsible>
      {GROUPED_FEEDBACK_DATA.map((group) => {
        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger>{group.groupName}</AccordionTrigger>
            <AccordionContent>
              <DynamicFeedbackTable
                isLoading={false}
                feedbackList={group.items}
                feedbackLimit={FEEDBACK_LIMIT}
              />
              {group.items.length >= FEEDBACK_LIMIT && (
                <Link
                  href={`/result/${group.id}`}
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
};

export default GroupedFeedback;
