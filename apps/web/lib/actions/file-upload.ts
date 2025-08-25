"use server";

import { auth } from "@/auth/auth";
import { api } from "../api";
import { signOut } from "next-auth/react";
import type {
  FeedbackFileUploadResponse,
  FileUploadResponse,
} from "@/types/feedback-file-upload";

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.upload("/api/feedback/upload", formData);

  return await response.json();
}

export async function uploadFiles(formData: FormData) {
  let fileStatuses: FileUploadResponse[] = [];
  try {
    const session = await auth();

    if (session?.user.token) {
      api.setToken(session?.user.token);
    } else {
      return signOut({ redirectTo: "/log-in" });
    }

    const files = formData.getAll("files") as File[] | null;

    if (files) {
      for (const file of files) {
        const response: FeedbackFileUploadResponse = await uploadFile(file);

        if (response.statusCode !== 201) {
          fileStatuses = [
            ...fileStatuses,
            {
              fileName: file.name,
              errors: response.message,
              status: response.statusCode,
              data: response.data,
            },
          ];
        } else {
          fileStatuses = [
            ...fileStatuses,
            {
              fileName: file.name,
              errors: null,
              status: 201,
              data: response.data,
            },
          ];
        }
      }
    } else {
      console.log("else is working");
      return "No files are found";
    }

    return fileStatuses;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred.";
    new Error(message);
  }
}
