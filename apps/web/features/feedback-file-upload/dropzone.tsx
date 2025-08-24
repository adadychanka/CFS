"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import PreviewFiles from "./preview/preview-files";
import FileUploadActions from "./file-upload-actions";
import { useCustomDropzone } from "@/hooks/useCustomDropzone";
import { cn } from "@repo/ui/lib/utils";

const fileUploadSchema = z.object({
  files: z.array(z.instanceof(File)),
});

type FileUploadFormData = z.infer<typeof fileUploadSchema>;

function Dropzone() {
  const form = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      files: [],
    },
  });

  const {
    files,
    error,
    getInputProps,
    getRootProps,
    isDragActive,
    handleClear,
    handleDeleteSingleFile,
  } = useCustomDropzone();

  React.useEffect(() => {
    form.setValue("files", files);
  }, [files, form]);

  const onSubmit = async (data: FileUploadFormData) => {
    try {
      console.log("Form submitted with files:", data, files);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const className = cn(
    "p-16 flex items-center justify-center mt-1 border border-neutral-200",
    { "bg-gray-100": isDragActive },
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <input {...getInputProps()} />
                  {<FileUpIcon width={"50px"} height={"50px"} />}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Your existing error handling - unchanged */}
        {error && <p className="text-red-600 mt-1">{error}</p>}

        {/* Your existing file preview and actions - unchanged */}
        {files.length > 0 && (
          <section className="mt-10">
            <PreviewFiles
              files={files}
              onDeleteSingleFile={handleDeleteSingleFile}
            />
            <FileUploadActions onClear={handleClear} />
          </section>
        )}
      </form>
    </Form>
  );
}

export default Dropzone;
