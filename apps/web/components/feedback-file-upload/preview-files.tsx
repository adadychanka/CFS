import React from "react";
import { LucideTrash } from "lucide-react";
import { truncateFileNames } from "@/utils/files-helper";

type Props = {
  files: File[];
  onDeleteSingleFile: (fileName: string) => void;
};

function PreviewFiles({ files, onDeleteSingleFile }: Props) {
  return (
    <ul className="mt-4">
      {files.map((file) => (
        <li key={file.name} className="flex gap-5 flex-nowrap">
          <span className="w-[400px] inline-block">
            {truncateFileNames(file)}
          </span>
          <LucideTrash onClick={() => onDeleteSingleFile(file.name)} />
        </li>
      ))}
    </ul>
  );
}

export default PreviewFiles;
