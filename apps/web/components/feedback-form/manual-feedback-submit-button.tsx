"use client";

import { Button } from "@repo/ui/components/button";
import { Sparkles } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { uploadManualFeedbacks } from "@/lib/actions/feedback";
import { useState } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";

type Props = {
  feedback: PreviewFeedback[];
  onClearFeedback: () => void;
};

const ManualFeedbackSubmitButton = ({ feedback, onClearFeedback }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFetch = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await uploadManualFeedbacks(feedback);

    if (result.success) {
      onClearFeedback();
    } else {
      clientAuthGuard(result.status);
      setErrorMessage(result.message ?? "Something went wrong");
    }

    setIsLoading(false);
  };

  const isFeedbackEmpty = feedback.length === 0;

  return (
    <div className="pt-4 flex gap-8">
      {isFeedbackEmpty && !errorMessage && (
        <p className="flex-1 text-neutral-800 mb-2">
          Please add feedback before submitting.
        </p>
      )}
      <p className="flex-1 text-red-600 mb-2">{errorMessage && errorMessage}</p>
      <Button onClick={handleFetch} disabled={isLoading || isFeedbackEmpty}>
        <Sparkles />
        {isLoading ? "Analyzing..." : "Analyze feedback"}
      </Button>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
