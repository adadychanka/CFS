import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { FAKE_PROCESSED_FEEDBACK } from "@/constants/constants";

const SentimentsTable = () => {
  console.log(FAKE_PROCESSED_FEEDBACK);

  return (
    <div className="overflow-x-auto rounded-md border max-h-[800px]">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Summary</TableHead>
            <TableHead className="w-[100px] text-center">Sentiment</TableHead>
            <TableHead className="w-[100px] text-center">Confidence</TableHead>
            <TableHead className="w-[200px]">Content</TableHead>
            <TableHead className="w-[160px]">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FAKE_PROCESSED_FEEDBACK.map((fd) => (
            <TableRow key={fd.id}>
              <TableCell>{fd.summary}</TableCell>
              <TableCell className="text-center">{fd.sentiment}</TableCell>
              <TableCell className="text-center">{fd.confidence}</TableCell>
              <TableCell className="max-w-[300px] truncate" title={fd.content}>
                {fd.content}
              </TableCell>
              <TableCell>{fd.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SentimentsTable;
