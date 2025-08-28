import type { FileUploadServerError } from "@/types/feedback-file-upload";
import React from "react";

type Props = {
  serverErrors: FileUploadServerError[];
};

function PreviewFileErrors({ serverErrors }: Props) {
  return (
    <div className="mt-2">
      {serverErrors.map((error) => {
        return (
          <p key={error.message}>
            {error.fileName && <>{error?.fileName}:</>}
            <span className="text-red-500 ml-1">{error.message}</span>
          </p>
        );
      })}
    </div>
  );
}

export default PreviewFileErrors;
