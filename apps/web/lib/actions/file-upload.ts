"use server";

import { auth, signOut } from "@/auth/auth";
import type {
  FeedbackFileUploadResponse,
  FileUploadResponse,
} from "@/types/feedback-file-upload";
import { getServerApi } from "../server-api";
import { createWorkspaceUrl } from "../create-workspace-url";

async function uploadFile(file: File, workspaceId: string) {
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

  const url = createWorkspaceUrl(workspaceId, "/feedbacks/upload");
  const response = await api.upload(url, formData);

  return await response.json();
}

export async function uploadFiles(formData: FormData, workspaceId: string) {
  let fileStatuses: FileUploadResponse[] = [];
  try {
    const files = formData.getAll("files") as File[] | null;

    if (!files) {
      fileStatuses = [
        ...fileStatuses,
        {
          errors: "No files are found",
          status: 400,
        },
      ];
      return fileStatuses;
    }

    if (files) {
      const results = await Promise.allSettled(
        files.map(async (file) => {
          const response: FeedbackFileUploadResponse = await uploadFile(
            file,
            workspaceId,
          );

          return {
            fileName: file.name,
            errors: response.statusCode !== 201 ? response.message : null,
            status: response.statusCode,
            data: response.data,
          };
        }),
      );

      fileStatuses = results.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          return {
            fileName: "Unknown",
            errors: result.reason?.toString() ?? "Upload failed",
            status: 500,
          };
        }
      });
    }

    return fileStatuses;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred.";
    new Error(message);
  }
}
