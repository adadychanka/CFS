import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";

type Props = {
  feedbacks: PreviewFeedback[];
};

const PreviewList = ({ feedback }: Props) => {
  return (
    <div>
      <p className="pb-2 font-medium">{feedback.length} items to preview</p>
      <PreviewListTable feedback={feedback} />
    </div>
  );
};

export default PreviewList;
