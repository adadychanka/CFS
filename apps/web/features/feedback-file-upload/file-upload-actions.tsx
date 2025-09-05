import React from "react";
import { LucideUploadCloud, Trash } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type Props = {
  onClear: () => void;
  isLoading: boolean;
};

function FileUploadActions({ onClear, isLoading }: Props) {
  return (
    <div className="mt-4 flex gap-2 justify-end">
      <Button variant={"outline"} type="reset" onClick={onClear}>
        <Trash /> Clear files
      </Button>
      <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
        <LucideUploadCloud />{" "}
        {isLoading ? "Processing files..." : "Process files"}
      </Button>
    </div>
  );
}

export default FileUploadActions;
