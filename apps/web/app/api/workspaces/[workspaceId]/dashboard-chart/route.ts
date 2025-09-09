import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { createWorkspaceUrl } from "@/lib/create-workspace-url";
import { FetchError } from "@/lib/errors";
import { getServerApi } from "@/lib/server-api";
import type { WorkspaceIdParams } from "@/types/pageParams";
import type { SentimentSummaryResponse } from "@/types/sentiment-summary";

export async function GET(req: NextRequest, { params }: WorkspaceIdParams) {
  const { workspaceId } = await params;

  if (!workspaceId) {
    return NextResponse.json(
      { message: "workspaceId is missing." },
      { status: 400 },
    );
  }

  const api = await getServerApi();
  const session = await auth();

  if (session?.user.token) {
    api.setToken(session.user.token);
  } else {
    return NextResponse.json(
      {
        message: "User session expired or not found, Please log in again!",
        status: 401,
      },
      {
        status: 401,
      },
    );
  }

  try {
    const url = createWorkspaceUrl(workspaceId, "/feedbacks/sentiment-summary");
    const response = await api.get(url);

    if (!response.ok) {
      return NextResponse.json({}, { status: response.status });
    }

    const result: SentimentSummaryResponse = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof FetchError)
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
        },
      );

    if (error instanceof Error)
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
