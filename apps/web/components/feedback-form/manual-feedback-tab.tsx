"use client";

import ManualFeedbackForm from "@/components/feedback-form/manual-feedback-form";
import PreviewList from "@/components/feedback-form/preview-list";
import { useCallback, useState } from "react";
import ManualFeedbackSubmitButton from "@/components/feedback-form/manual-feedback-submit-button";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";

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

  const handleClearFeedback = useCallback(() => {
    if (feedback.length > FEEDBACK_MAX_ITEMS) {
      setFeedback((prev) => prev.slice(FEEDBACK_MAX_ITEMS));
    } else {
      setFeedback([]);
    }
  }, [feedback.length]);

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewList
        feedback={feedback}
        onRemoveFeedback={handleRemoveFeedback}
      />
      <ManualFeedbackSubmitButton
        feedback={feedback}
        onClearFeedback={handleClearFeedback}
      />
    </div>
  );
};

export default ManualFeedbackTab;
