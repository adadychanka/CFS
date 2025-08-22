"use client";

import { Button } from "@repo/ui/components/button";
import { Sparkles } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { uploadManualFeedback } from "@/lib/actions/feedback";
import { useState } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { toast } from "sonner";

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

    const result = await uploadManualFeedback(feedback);
    if (result?.success) {
      toast.success(result.message);
      onClearFeedback();
    } else {
      clientAuthGuard(result?.status);
      setErrorMessage(result?.message ?? "Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <div className="pt-4 flex gap-8">
      <p className="flex-1 text-red-600 mb-2">{errorMessage && errorMessage}</p>
      <Button onClick={handleFetch} disabled={isLoading}>
        <Sparkles />
        {isLoading ? "Analyzing..." : "Analyze feedback"}
      </Button>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
