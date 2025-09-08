import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import type { SavedFilesResponse } from "@/types/saved-files";
import { getErrorMessage } from "@/lib/get-error-message";
import { getUnknownErrorMessage } from "@/lib/get-unknown-error-message";

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
      let errorMessage = `Request failed with status ${response.status}`;
      errorMessage = (await getErrorMessage(response)) || "Unexpected error.";

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status },
      );
    }

    const result: SavedFilesResponse = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    const errorResponse = await getUnknownErrorMessage(error);
    return NextResponse.json(
      { error: errorResponse.error },
      { status: errorResponse.status },
    );
  }
}
