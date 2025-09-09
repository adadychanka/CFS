import { NextResponse } from "next/server";
import type { GetWorkspacesResponse } from "@/types/http";
import { auth } from "@/auth/auth";
import { getErrorMessage } from "@/lib/get-error-message";
import { getUnknownErrorMessage } from "@/lib/get-unknown-error-message";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, status: 401, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const requestUrl = new URL("/api/workspaces", process.env.BACKEND_API);

    const res = await fetch(requestUrl.toString(), {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!res.ok) {
      const errorMessage = (await getErrorMessage(res)) || "Unexpected error.";
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    const body = await res.json();
    const data: GetWorkspacesResponse = body.data;

    return NextResponse.json({
      success: true,
      status: 200,
      data,
    });
  } catch (error) {
    const errorResponse = await getUnknownErrorMessage(error);
    return NextResponse.json(
      { error: errorResponse.error },
      { status: errorResponse.status },
    );
  }
}
