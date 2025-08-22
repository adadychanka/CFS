import PreviewListItem from "@/components/feedback-form/preview-list/preview-list-item";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import PreviewListEmpty from "@/components/feedback-form/preview-list/preview-list-empty";

type Props = {
  feedback: PreviewFeedback[];
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewList = ({ feedback, onRemoveFeedback }: Props) => {
  if (feedback.length === 0) return <PreviewListEmpty />;

  return feedback.map((item, index) => (
    <PreviewListItem
      key={item.id}
      index={index}
      feedback={item}
      onRemoveFeedback={onRemoveFeedback}
    />
  ));
};

export default PreviewList;
