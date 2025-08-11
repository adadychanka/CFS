import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { FAKE_PROCESSED_FEEDBACKS } from "@/constants/constants";

const SentimentsTable = () => {
  console.log(FAKE_PROCESSED_FEEDBACKS);

  return (
    <div className="overflow-x-auto rounded-md border max-h-[800px]">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="">Summary</TableHead>
            <TableHead className="w-auto">Sentiment</TableHead>
            <TableHead className="w-[100px] text-center">Confidence</TableHead>
            <TableHead className="w-[100px] text-center">Content</TableHead>
            <TableHead className="w-[100px] text-center">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FAKE_PROCESSED_FEEDBACKS.map((fd) => (
            <TableRow key={fd.id}>
              <TableCell>{fd.summary}</TableCell>
              <TableCell>{fd.sentiment}</TableCell>
              <TableCell>{fd.confidence}</TableCell>
              <TableCell>...</TableCell>
              <TableCell>{fd.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SentimentsTable;
