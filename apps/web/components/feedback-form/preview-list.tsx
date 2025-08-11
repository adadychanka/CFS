import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";

type Props = {
  feedbacks: PreviewFeedback[];
};

const PreviewList = ({ feedbacks }: Props) => {
  return (
    <div>
      <p className="pb-2 font-medium">{feedbacks.length} items to preview</p>
      <PreviewListTable feedbacks={feedbacks} />
    </div>
  );
};

export default PreviewList;
