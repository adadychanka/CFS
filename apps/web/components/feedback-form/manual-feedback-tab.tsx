"use client";

import ManualFeedbackForm from "@/components/feedback-form/manual-feedback-form";
import PreviewList from "@/components/feedback-form/preview-list";
import { useState } from "react";

export type PreviewFeedback = {
  id: string;
  feedback: string;
};

const ManualFeedbackTab = () => {
  const [feedback, setFeedback] = useState<PreviewFeedback[]>();

  const handleAddFeedback = (feedback: PreviewFeedback[]) => {
    setFeedback((prev) => [...prev, ...feedback]);
  };

  const handleRemoveFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewList feedback={feedback} />
      <PreviewList
        feedback={feedback}
        onRemoveFeedback={handleRemoveFeedback}
      />
    </div>
  );
};

export default ManualFeedbackTab;
