import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";

type Props = {
  feedback: PreviewFeedback[];
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewList = ({ feedback, onRemoveFeedback }: Props) => {
  return (
    <div>
      <p className="pb-4 font-medium">{feedback.length} items to preview</p>
      <PreviewListTable
        feedback={feedback}
        onRemoveFeedback={onRemoveFeedback}
      />
      <div className="pt-4 flex justify-end">
        <Button>
          <Send /> Upload feedbacks
        </Button>
      </div>
    </div>
  );
};

export default PreviewList;
