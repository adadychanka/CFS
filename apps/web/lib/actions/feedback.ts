"use server";

import type { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { auth } from "@/auth/auth";

export const uploadManualFeedbacks = async (feedback: PreviewFeedback[]) => {
  try {
    const session = await auth();
    if (!session) {
      return { success: false, status: 401, message: "Unauthorized" };
    }

    const formattedFeedback = {
      feedbacks: feedback.map((feedback) => feedback.feedback),
    };

    const res = await fetch(
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      `${process.env.BACKEND_API}/api/feedback/manual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(formattedFeedback),
      },
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: data.message,
      };
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
};
