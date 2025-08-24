import { TableCell, TableRow } from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";

type Props = {
  index: number;
  file: File;
  onDeleteSingleFile: (fileName: string) => void;
};

const PreviewFileListItem = ({ index, file, onDeleteSingleFile }: Props) => {
  const isReadyToAnalyze = index >= FEEDBACK_MAX_ITEMS;

  return (
    <TableRow
      key={file.name}
      className={isReadyToAnalyze ? "text-neutral-600" : ""}
    >
      <TableCell className="pl-4 font-medium">{index + 1}</TableCell>
      <TableCell className="whitespace-normal truncate">{file.name}</TableCell>
      <TableCell className="whitespace-normal break-words">
        <Badge
          className={`w-[80px] text-center ${isReadyToAnalyze ? "bg-gray-200" : "bg-green-200"}`}
          variant="secondary"
        >
          {isReadyToAnalyze ? "in queue" : "ready"}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDeleteSingleFile(file.name)}
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PreviewFileListItem;
