import React from "react";
import FileUploadDropzone from "./file-upload-dropzone";

function FileUploadForm({ workspaceId }: { workspaceId: string }) {
  return (
    <>
      <h2>Upload CSV file</h2>
      <FileUploadDropzone workspaceId={workspaceId} />
    </>
  );
}

export default FileUploadForm;
