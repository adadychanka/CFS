import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth/auth";
import { FetchError } from "@/lib/errors";
import { getServerApi } from "@/lib/server-api";
import type { SavedFilesResponse } from "@/types/saved-files";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;

  if (!fileId) {
    return NextResponse.json(
      {
        message: "File ID must be provided in the request query.",
      },
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
    const response = await api.delete(`/api/files/${fileId}`);

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
