import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  MAX_FILES_PER_UPLOAD,
  SAVED_FILES_PAGE_LIMIT,
} from "@/constants/constants";
import type {
  FileUploadResponse,
  FileUploadServerError,
} from "@/types/feedback-file-upload";
import { uploadFiles } from "@/lib/actions/file-upload";
import { useCustomDropzone } from "./useCustomDropzone";
import { useSearchParams } from "next/navigation";
import { mutate } from "swr";
import {
  SAVED_FILES_LIMIT_QUERY_KEY,
  SAVED_FILES_PAGE_QUERY_KEY,
} from "@/constants";

const fileUploadSchema = z.object({
  files: z.array(z.instanceof(File)),
});

type FileUploadFormData = z.infer<typeof fileUploadSchema>;

function useFileUpload(workspaceId: string) {
  const [serverErrors, setServerErrors] = useState<
    FileUploadServerError[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();
  const currentPage = params.get(SAVED_FILES_PAGE_QUERY_KEY) || 1;
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

  useEffect(() => {
    form.setValue("files", files);
  }, [files, form]);

  const handleClearData = useCallback(() => {
    handleClear();
    setServerErrors(null);
  }, [handleClear]);

  const handleSubmit = useCallback(async () => {
    handleClearErrors();
    setServerErrors(null);
    setIsLoading(true);
    let errors: FileUploadServerError[] = [];

    try {
      const formData = new FormData();
      files.slice(0, MAX_FILES_PER_UPLOAD).forEach((file) => {
        formData.append("files", file);
      });
      const fileUploadResult = await uploadFiles(formData, workspaceId);
      if (fileUploadResult instanceof Array) {
        fileUploadResult.forEach((result) => {
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

      if (!errors.length) {
        toast.success("All files has been processed!");
        mutate(
          `/api/files?${SAVED_FILES_PAGE_QUERY_KEY}=${currentPage}&${SAVED_FILES_LIMIT_QUERY_KEY}=${SAVED_FILES_PAGE_LIMIT}`,
        );
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
  }, [
    files,
    handleClearErrors,
    handleDeleteSingleFile,
    currentPage,
    workspaceId,
  ]);

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
