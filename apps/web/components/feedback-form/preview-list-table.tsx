import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { TEST_PREVIEW_FEEDBACKS } from "@repo/ui/constants/contants";

const PreviewListTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>Feedback description</TableHead>
          <TableHead className="w-[100px]">Delete Item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TEST_PREVIEW_FEEDBACKS.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.feedback}</TableCell>

            <TableCell className="text-center">📕</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PreviewListTable;
