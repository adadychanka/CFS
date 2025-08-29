"use server";

import { auth, signOut } from "@/auth/auth";
import type {
  FeedbackFileUploadResponse,
  FileUploadResponse,
} from "@/types/feedback-file-upload";
import { getServerApi } from "../server-api";

async function uploadFile(file: File) {
  const api = await getServerApi();
  const session = await auth();

  if (session?.user.token) {
    api.setToken(session?.user.token);
  } else {
    await signOut({ redirectTo: "/log-in" });
    return { statusCode: 401, message: "Unauthorized!" };
  }

  const formData = new FormData();
  formData.append("file", file);
  const response = await api.upload("/api/feedback/upload", formData);

  return await response.json();
}

export async function uploadFiles(formData: FormData) {
  let fileStatuses: FileUploadResponse[] = [];
  try {
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
      return "No files are found";
    }

    return fileStatuses;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred.";
    new Error(message);
  }
}
