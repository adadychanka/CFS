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

type Props = {
  feedbacks: PreviewFeedback[];
  onRemoveFeedback: (feedbackId: string) => void;
};

const PreviewListTable = ({ feedbacks, onRemoveFeedback }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border max-h-[800px]">
      <Table className="min-w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-[48px]">#</TableHead>
            <TableHead className="w-auto">Feedback</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.length > 0 ? (
            feedbacks.map((item, index) => (
              <TableRow key={item.id}>
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
