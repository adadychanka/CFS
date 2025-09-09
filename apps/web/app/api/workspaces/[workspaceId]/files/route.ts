import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import { FetchError } from "@/lib/errors";
import type { SavedFilesResponse } from "@/types/saved-files";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";
import type { WorkspaceIdParams } from "@/types/pageParams";
import { createWorkspaceUrl } from "@/lib/create-workspace-url";

export async function GET(req: NextRequest, { params }: WorkspaceIdParams) {
  const { workspaceId } = await params;

  if (!workspaceId) {
    return NextResponse.json(
      { success: false, status: 400, message: "workspaceId is missing." },
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
    const { limit, page } = getPaginationParamsFromNextRequest(req);
    const url = createWorkspaceUrl(
      workspaceId,
      `/files?limit=${limit}&page=${page}`,
    );

    const response = await api.get(url);

    if (!response.ok) {
      return NextResponse.json({}, { status: response.status });
    }

    const result: SavedFilesResponse = await response.json();

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
