import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { uploadManualFeedbacks } from "@/lib/actions";
import { useState } from "react";

type Props = {
  feedbacks: PreviewFeedback[];
};

const ManualFeedbackSubmitButton = ({ feedbacks }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await uploadManualFeedbacks(feedbacks);
      // optionally show success or reset UI
    } catch {
      setError("Failed to upload feedbacks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 flex justify-end">
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <Button onClick={handleSubmit} disabled={loading}>
        <Send />
        {loading ? "Uploading..." : "Upload feedbacks"}
      </Button>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
