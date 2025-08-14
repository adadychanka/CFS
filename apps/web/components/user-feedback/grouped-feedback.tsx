import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { GROUPED_FEEDBACK_DATA } from "@/constants/constants";
import DynamicFeedbackTable from "./dynamic-feedback-table";

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
                feedbackLimit={10}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default GroupedFeedback;
