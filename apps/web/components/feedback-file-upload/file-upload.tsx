import React from "react";
import Dropzone from "./dropzone";
import { Label } from "@repo/ui/components/label";

function FileUpload() {
  return (
    <>
      <Label>Upload CSV file</Label>
      <Dropzone />
    </>
  );
}

export default FileUpload;
