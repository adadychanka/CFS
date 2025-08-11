import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";

type Props = {
  feedbacks: PreviewFeedback[];
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewList = ({ feedbacks, onRemoveFeedback }: Props) => {
  return (
    <div>
      <p className="pb-4 font-medium">{feedbacks.length} items to preview</p>
      <PreviewListTable
        feedbacks={feedbacks}
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
