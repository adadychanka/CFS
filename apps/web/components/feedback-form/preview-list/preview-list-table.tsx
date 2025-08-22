import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import PreviewList from "@/components/feedback-form/preview-list/preview-list";

type Props = {
  feedback: PreviewFeedback[];
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewListTable = ({ feedback, onRemoveFeedback }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border max-h-[800px]">
      <Table className="min-w-[600px] table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-[60px]">#</TableHead>
            <TableHead className="w-auto">Feedback</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <PreviewList
            feedback={feedback}
            onRemoveFeedback={onRemoveFeedback}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviewListTable;
