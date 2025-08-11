import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";

type Props = {
  feedback: PreviewFeedback[];
};

const PreviewListTable = ({ feedback }: Props) => {
  return (
    <div className="overflow-hidden rounded-md border overflow-y-scroll max-h-[800px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-[60px]">#</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedback.length > 0 ? (
            feedback.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="pl-4 font-medium">{index + 1}</TableCell>
                <TableCell>{item.feedback}</TableCell>
                <TableCell className="text-center">📕</TableCell>
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
