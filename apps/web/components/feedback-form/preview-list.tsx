import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";

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
    </div>
  );
};

export default PreviewList;
