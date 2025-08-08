import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";

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
        {Array.from({ length: 100 }, (_, i) => i + 1).map((item) => (
          <TableRow key={item}>
            <TableCell className="font-medium">{item}</TableCell>
            <TableCell>Description...</TableCell>
            <TableCell className="text-center">📕</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PreviewListTable;
