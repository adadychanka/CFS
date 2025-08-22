"use server";

import type { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { auth } from "@/auth/auth";

export async function uploadManualFeedback(feedback: PreviewFeedback[]) {
  const session = await auth();
  if (!session) {
    return { success: false, status: 401, message: "Unauthorized" };
  }

  try {
    const formattedFeedback = {
      feedbacks: feedback.map((f) => f.feedback),
    };

    const res = await fetch(`${process.env.BACKEND_API}/api/feedback/manual`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify(formattedFeedback),
    });

    if (!res.ok) {
      const data = await res.json();
      return { success: false, status: res.status, message: data.message };
    }

    return {
      success: true,
      status: 201,
      message: "Feedbacks uploaded successfully",
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return { success: false, status: 500, message };
  }
}
