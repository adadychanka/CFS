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
  const [feedback, setFeedback] = useState<PreviewFeedback[]>([]);

  const handleAddFeedback = useCallback((feedback: PreviewFeedback[]) => {
    setFeedback((prev) => [...prev, ...feedback]);
  }, []);

  const handleRemoveFeedback = useCallback((id: string) => {
    setFeedback((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleClearFeedbacks = useCallback(() => {
    setFeedback([]);
  }, []);

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewList
        feedback={feedback}
        onRemoveFeedback={handleRemoveFeedback}
      />
      <ManualFeedbackSubmitButton
        feedback={feedback}
        onClearFeedbacks={handleClearFeedbacks}
      />
    </div>
  );
};

export default ManualFeedbackTab;
