"use client";

import { Button } from "@repo/ui/components/button";
import { FlaskConical, Sparkles } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { uploadManualFeedback } from "@/lib/actions/feedback";
import { useState } from "react";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { toast } from "sonner";
import { useSampleMode } from "@/providers/sample-mode-provider";
import { redirect } from "next/navigation";

type Props = {
  feedback: PreviewFeedback[];
  onClearFeedback: () => void;
};

const ManualFeedbackSubmitButton = ({ feedback, onClearFeedback }: Props) => {
  const { setSampleMode } = useSampleMode();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUploadFeedback = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await uploadManualFeedback(feedback);
    if (result.success) {
      toast.success(result.message);
      onClearFeedback();
    } else {
      clientAuthGuard(result.status);
      setErrorMessage(result.message ?? "Something went wrong");
    }

    setIsLoading(false);
  };

  const handleSwitchSampleMode = () => {
    setSampleMode(true);
    redirect("/");
  };

  return (
    <div className="pt-4 flex gap-8">
      <p className="flex-1 text-red-600 mb-2">{errorMessage && errorMessage}</p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handleSwitchSampleMode}
          disabled={isLoading}
        >
          <FlaskConical />
          Try with sample mode
        </Button>
        <Button onClick={handleUploadFeedback} disabled={isLoading}>
          <Sparkles />
          {isLoading ? "Analyzing..." : "Analyze feedback"}
        </Button>
      </div>
    </div>
  );
};

export default ManualFeedbackSubmitButton;
