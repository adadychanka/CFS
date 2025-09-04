import React from "react";
import FileUploadDropzone from "./file-upload-dropzone";

function FileUploadForm() {
  return (
    <section className="pb-4">
      <h2 className="font-medium mb-2">Upload CSV file</h2>
      <FileUploadDropzone />
    </section>
  );
}

export default FileUploadForm;
