import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import { FetchError } from "@/lib/errors";
import type { SavedFilesResponse } from "@/types/saved-files";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";

export async function GET(req: NextRequest) {
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

    const response = await api.get(`/api/files?limit=${limit}&page=${page}`);

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
