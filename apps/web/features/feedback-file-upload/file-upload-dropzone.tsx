"use client";

import React from "react";
import { FileUpIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@repo/ui/components/form";
import FileUploadActions from "./file-upload-actions";
import { cn } from "@repo/ui/lib/utils";
import PreviewFileSection from "./preview/preview-file-section";
import useFileUpload from "@/hooks/useFileUpload";
import PreviewFileErrors from "./preview/preview-file-erros";

function FileUploadDropzone() {
  const {
    form,
    serverErrors,
    error,
    getInputProps,
    getRootProps,
    isDragActive,
    handleClearData,
    handleSubmit,
    isLoading,
    files,
    handleDeleteSingleFile,
  } = useFileUpload();

  const className = cn(
    "p-16 flex items-center justify-center flex-col gap-2  mt-1 border border-neutral-200",
    { "bg-gray-100": isDragActive },
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem>
              <FormLabel className="sr-only">File Upload</FormLabel>
              <FormDescription className="sr-only">
                Upload your files using drag and drop or click to select
              </FormDescription>
              <FormControl>
                <div {...getRootProps({ className })}>
                  <input {...getInputProps()} id="file" />
                  {<FileUpIcon width={"50px"} height={"50px"} />}
                  <label htmlFor="file">Upload or drag and drop</label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-red-600 mt-1">{error}</p>}

        {files.length > 0 && (
          <section className="mt-10">
            <PreviewFileSection
              files={files}
              onDeleteSingleFile={handleDeleteSingleFile}
            />
            {serverErrors && <PreviewFileErrors serverErrors={serverErrors} />}
            <FileUploadActions
              onClear={handleClearData}
              isLoading={isLoading}
            />
          </section>
        )}
      </form>
    </Form>
  );
}

export default FileUploadDropzone;
