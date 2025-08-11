import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";

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
    </div>
  );
};

export default PreviewList;
