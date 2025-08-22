"use client";

import ManualFeedbackForm from "@/components/feedback-form/manual-feedback-form";
import PreviewListSection from "@/components/feedback-form/preview-list/preview-list-section";
import { useCallback } from "react";
import ManualFeedbackSubmitButton from "@/components/feedback-form/manual-feedback-submit-button";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export type PreviewFeedback = {
  id: string;
  feedback: string;
};

const ManualFeedbackTab = () => {
  const [feedback, setFeedback] = useSessionStorage<PreviewFeedback[]>(
    "preview-feedback",
    [],
  );

  const handleAddFeedback = useCallback(
    (feedback: PreviewFeedback[]) => {
      setFeedback((prev) => [...prev, ...feedback]);
    },
    [setFeedback],
  );

  const handleRemoveFeedback = useCallback(
    (id: string) => {
      setFeedback((prev) => prev.filter((e) => e.id !== id));
    },
    [setFeedback],
  );

  const handleClearFeedback = useCallback(() => {
    if (feedback.length > FEEDBACK_MAX_ITEMS) {
      setFeedback((prev) => prev.slice(FEEDBACK_MAX_ITEMS));
    } else {
      setFeedback([]);
    }
  }, [feedback.length, setFeedback]);

  return (
    <div>
      <ManualFeedbackForm onAddFeedback={handleAddFeedback} />
      <PreviewListSection
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
