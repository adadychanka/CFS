import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { MAX_FILES_PER_UPLOAD } from "@/constants/constants";
import type {
  FileUploadResponse,
  FileUploadServerError,
} from "@/types/feedback-file-upload";
import { uploadFiles } from "@/lib/actions/file-upload";
import { useCustomDropzone } from "./useCustomDropzone";

const fileUploadSchema = z.object({
  files: z.array(z.instanceof(File)),
});

type FileUploadFormData = z.infer<typeof fileUploadSchema>;

function useFileUpload() {
  const [serverErrors, setServerErrors] = useState<
    FileUploadServerError[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
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
    handleClearErrors,
  } = useCustomDropzone();

  React.useEffect(() => {
    form.setValue("files", files);
  }, [files, form]);

  function handleClearData() {
    handleClear();
    setServerErrors(null);
  }

  const handleSubmit = async () => {
    handleClearErrors();
    setServerErrors(null);
    setIsLoading(true);
    console.log("Submitting");
    let errors: FileUploadServerError[] = [];

    try {
      const formData = new FormData();
      files.slice(0, MAX_FILES_PER_UPLOAD).forEach((file) => {
        formData.append("files", file);
      });
      const fileUploadResult = await uploadFiles(formData);
      console.log(fileUploadResult);

      if (typeof fileUploadResult === "string") {
        setServerErrors([{ message: fileUploadResult }]);
      }
      if (fileUploadResult instanceof Array) {
        (fileUploadResult as FileUploadResponse[]).forEach((result) => {
          if (result.errors) {
            errors = [
              ...errors,
              { message: result.errors, fileName: result.fileName },
            ];
          } else {
            handleDeleteSingleFile(result.fileName);
          }
        });
      }

      console.log(serverErrors);

      if (!errors.length) {
        toast.success("All files has been processed!");
      } else {
        if (
          (fileUploadResult as FileUploadResponse[]).some(
            (result) => result.status === 201,
          )
        ) {
          toast.warning("Not all files has been processed.");
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setServerErrors([...errors]);
    setIsLoading(false);
  };

  return {
    files,
    form,
    serverErrors,
    error,
    getInputProps,
    getRootProps,
    isDragActive,
    handleClearData,
    handleSubmit,
    isLoading,
    handleDeleteSingleFile,
  };
}

export default useFileUpload;
