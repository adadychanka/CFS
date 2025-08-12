import React from "react";
import { LucideUploadCloud, Trash } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type Props = {
  onClear: () => void;
};

function FileUploadActions({ onClear }: Props) {
  return (
    <div className="mt-4 flex gap-2">
      <Button variant={"outline"} type="button" onClick={onClear}>
        <Trash /> Clear files
      </Button>
      <Button>
        <LucideUploadCloud /> Process files
      </Button>
    </div>
  );
}

export default FileUploadActions;
