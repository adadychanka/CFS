import PreviewListTable from "@/components/feedback-form/preview-list/preview-list-table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";

type Props = {
  feedback: PreviewFeedback[];
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewListSection = ({ feedback, onRemoveFeedback }: Props) => {
  return (
    <div>
      <p className="font-medium">{feedback.length} feedback in total</p>
      <p className="pb-4 text-muted-foreground text-sm">
        We’ll process the first {FEEDBACK_MAX_ITEMS} now, and save the rest for
        when you’re ready. Items marked as <em>ready</em> label will be included
        in this submission.
      </p>
      <PreviewListTable
        feedback={feedback}
        onRemoveFeedback={onRemoveFeedback}
      />
    </div>
  );
};

export default PreviewListSection;
