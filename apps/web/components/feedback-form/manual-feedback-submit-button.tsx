"use client";

import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { useState } from "react";

type Props = {
  feedback: PreviewFeedback[];
  onClearFeedback: () => void;
};

const ManualFeedbackSubmitButton = ({ feedback, onClearFeedback }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const feedbackOnlyString = feedback.map((item) => item.feedback);
      await fetch("/api/feedback/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: feedbackOnlyString }),
      });
      onClearFeedback();
    } catch {
      setError("Failed to upload feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 flex gap-8">
      <p className="flex-1 text-red-600 mb-2">{error}</p>

      <Button onClick={handleSubmit} disabled={loading}>
        <Send />
        {loading ? "Analyzing..." : "Analyze feedback"}
      </Button>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
