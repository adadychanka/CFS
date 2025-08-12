"use client";

import React from "react";
import { FileUpIcon } from "lucide-react";
import PreviewFiles from "./preview-files";
import FileUploadActions from "./file-upload-actions";
import { useCustomDropzone } from "@/hooks/useCustomDropzone";

function Dropzone() {
  const {
    files,
    error,
    getInputProps,
    getRootProps,
    isDragActive,
    handleClear,
    handleDeleteSingleFile,
  } = useCustomDropzone();

  const className = `p-16 flex items-center justify-center mt-1 border border-neutral-200 ${isDragActive ? "bg-gray-100" : ""}`;

  return (
    <form>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {<FileUpIcon width={"50px"} height={"50px"} />}
      </div>
      {error && <p className="text-red-600 mt-1">{error}</p>}
      <PreviewFiles files={files} onDeleteSingleFile={handleDeleteSingleFile} />
      {files.length > 0 && <FileUploadActions onClear={handleClear} />}
    </form>
  );
}

export default Dropzone;
