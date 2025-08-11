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
};

const PreviewListTable = ({ feedbacks }: Props) => {
  return (
    <div className="overflow-hidden rounded-md border overflow-y-scroll max-h-[800px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-[60px]">#</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.length > 0 ? (
            feedbacks.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="pl-4 font-medium">{index + 1}</TableCell>
                <TableCell>{item.feedback}</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="ghost">
                    <Trash2 /> Delete
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
