"use client";

import ManualFeedbackForm from "@/components/feedback-form/manual-feedback-form";
import PreviewList from "@/components/feedback-form/preview-list";
import { useState } from "react";
import { TEST_PREVIEW_FEEDBACKS } from "@repo/ui/constants/constants";

export type PreviewFeedback = {
  id: string;
  feedback: string;
};

const ManualFeedbackTab = () => {
  const [feedback, setFeedback] = useState<PreviewFeedback[]>(
    TEST_PREVIEW_FEEDBACKS,
  );

  const handleAddFeedback = (feedbacks: PreviewFeedback[]) => {
    setFeedback((prev) => [...prev, ...feedbacks]);
  };

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewList feedbacks={feedback} />
    </div>
  );
};

export default ManualFeedbackTab;
