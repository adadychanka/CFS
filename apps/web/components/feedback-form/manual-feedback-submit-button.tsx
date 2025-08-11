import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { uploadManualFeedbacks } from "@/lib/actions";
import { useState } from "react";

type Props = {
  feedbacks: PreviewFeedback[];
  onClearFeedbacks: () => void;
};

const ManualFeedbackSubmitButton = ({ feedbacks, onClearFeedbacks }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const feedbacksOnlyString = feedbacks.map((item) => item.feedback);
      await uploadManualFeedbacks(feedbacksOnlyString);
      onClearFeedbacks();
    } catch {
      setError("Failed to upload feedbacks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 flex gap-8">
      <p className="flex-1 text-red-600 mb-2">{error && error}</p>

      <Button onClick={handleSubmit} disabled={loading}>
        <Send />
        {loading ? "Uploading..." : "Upload feedbacks"}
      </Button>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
