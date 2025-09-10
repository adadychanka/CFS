"use server";

import type { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { auth } from "@/auth/auth";
import { FEEDBACK_MAX_ITEMS } from "@/constants/constants";
import callBackend from "@/lib/call-backend";
import { createWorkspaceUrl } from "../create-workspace-url";
import { getServerApi } from "../server-api";

export async function uploadManualFeedback(
  feedback: PreviewFeedback[],
  workspaceId: string,
) {
  const formattedFeedback = {
    feedbacks: feedback.map((f) => f.feedback).slice(0, FEEDBACK_MAX_ITEMS),
  };

  const url = createWorkspaceUrl(workspaceId, "/feedbacks/manual");
  return callBackend(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formattedFeedback,
    },
    "Feedback uploaded successfully",
  );
}

export async function downloadReport(
  type: "summary" | "detailed",
  format: "csv" | "pdf",
  workspaceId: string,
) {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        status: 401,
        message: "Unauthorized",
      };
    }
    const api = await getServerApi();
    api.setToken(session.user.token);

    const url = createWorkspaceUrl(
      workspaceId,
      `/feedbacks/report?type=${type}&format=${format}`,
    );
    const res = await api.get(url);

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: `Backend request failed with ${res.status}`,
      };
    }

    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      success: true,
      status: res.status,
      data: base64,
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Something went wrong";

    return {
      success: false,
      status: 500,
      message,
    };
  }
}
