import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { TEST_PREVIEW_FEEDBACKS } from "@/constants/contants";

const PreviewListTable = () => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-[60px]">#</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TEST_PREVIEW_FEEDBACKS.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="pl-4 font-medium">{index + 1}</TableCell>
              <TableCell>{item.feedback}</TableCell>
              <TableCell className="text-center">📕</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviewListTable;
