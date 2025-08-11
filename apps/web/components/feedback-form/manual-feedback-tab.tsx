"use client";

import ManualFeedbackForm from "@/components/feedback-form/manual-feedback-form";
import PreviewList from "@/components/feedback-form/preview-list";
import { useState } from "react";

export type PreviewFeedback = {
  id: string;
  feedback: string;
};

const ManualFeedbackTab = () => {
  const [feedbacks, setFeedbacks] = useState<PreviewFeedback[]>([]);

  const handleAddFeedback = (feedbacks: PreviewFeedback[]) => {
    setFeedbacks((prev) => [...prev, ...feedbacks]);
  };

  const handleRemoveFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewList
        feedbacks={feedbacks}
        onRemoveFeedback={handleRemoveFeedback}
      />
    </div>
  );
};

export default ManualFeedbackTab;
