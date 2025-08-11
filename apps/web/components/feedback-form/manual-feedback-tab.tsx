"use client";

import ManualFeedbackForm from "@/components/feedback-form/manual-feedback-form";
import PreviewList from "@/components/feedback-form/preview-list";
import { useCallback, useState } from "react";
import ManualFeedbackSubmitButton from "@/components/feedback-form/manual-feedback-submit-button";

export type PreviewFeedback = {
  id: string;
  feedback: string;
};

const ManualFeedbackTab = () => {
  const [feedbacks, setFeedbacks] = useState<PreviewFeedback[]>([]);

  const handleAddFeedback = useCallback((feedbacks: PreviewFeedback[]) => {
    setFeedbacks((prev) => [...prev, ...feedbacks]);
  }, []);

  const handleRemoveFeedback = useCallback((id: string) => {
    setFeedbacks((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleClearFeedbacks = useCallback(() => {
    setFeedbacks([]);
  }, []);

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewList
        feedbacks={feedbacks}
        onRemoveFeedback={handleRemoveFeedback}
      />
      <ManualFeedbackSubmitButton
        feedbacks={feedbacks}
        onClearFeedbacks={handleClearFeedbacks}
      />
    </div>
  );
};

export default ManualFeedbackTab;
