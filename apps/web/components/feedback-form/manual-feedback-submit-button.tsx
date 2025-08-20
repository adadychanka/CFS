"use client";

import { Button } from "@repo/ui/components/button";
import { Sparkles } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { useState } from "react";
import { toast } from "sonner";

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

      const res = await fetch("/api/feedback/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: feedbackOnlyString }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unknown error");
        return;
      }

      toast.success(data.message);
      onClearFeedback();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 flex gap-8">
      <p className="flex-1 text-red-600 mb-2">{error}</p>

      <Button onClick={handleSubmit} disabled={loading}>
        <Sparkles />
        {loading ? "Analyzing..." : <span>Analyze feedback</span>}
      </Button>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
