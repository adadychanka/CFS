import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";

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
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedback.length > 0 ? (
            feedback.map((item, index) => (
              <TableRow
                key={item.id}
                className={
                  index >= FEEDBACK_MAX_ITEMS ? "text-neutral-600" : ""
                }
              >
                <TableCell className="pl-4 font-medium">{index + 1}</TableCell>
                <TableCell className="whitespace-normal break-words">
                  {item.feedback}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveFeedback(item.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-12 text-muted-foreground"
              >
                No feedback items yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviewListTable;
