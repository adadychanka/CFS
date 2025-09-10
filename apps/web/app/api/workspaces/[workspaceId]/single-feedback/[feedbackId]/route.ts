import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import type { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";
import { createWorkspaceUrl } from "@/lib/create-workspace-url";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ feedbackId: string; workspaceId: string }> },
) {
  const { feedbackId, workspaceId } = await params;

  if (!workspaceId) {
    return NextResponse.json(
      {
        message: "workspaceId is missing.",
      },
      { status: 400 },
    );
  }

  if (!feedbackId) {
    return NextResponse.json(
      {
        message: "feedbackId is missing.",
      },
      { status: 400 },
    );
  }

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, status: 401, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const url = createWorkspaceUrl(workspaceId, `/feedbacks/${feedbackId}`);

    const res = await fetch(`${process.env.BACKEND_API}${url}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Failed to fetch feedback details.",
        },
        { status: res.status },
      );
    }

    const body = await res.json();
    const data: SentimentAnalysisResult = body.data;

    return NextResponse.json({
      success: true,
      status: 200,
      data,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, status: 500, message },
      { status: 500 },
    );
  }
}
