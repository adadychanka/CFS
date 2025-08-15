import React from "react";
import { LucideTrash } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type Props = {
  files: File[];
  onDeleteSingleFile: (fileName: string) => void;
};

function PreviewFiles({ files, onDeleteSingleFile }: Props) {
  return (
    <ul className="mt-4">
      {files.map((file) => (
        <li key={file.name} className="flex gap-5 flex-nowrap items-center">
          <span className="truncate w-[400px] inline-block">{file.name}</span>
          <Button
            variant={"ghost"}
            aria-label="Delete file"
            onClick={() => onDeleteSingleFile(file.name)}
          >
            <LucideTrash />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default PreviewFiles;
