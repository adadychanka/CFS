import { NextResponse } from "next/server";
import { GetWorkspacesResponse } from "@/types/http";
import { auth } from "@/auth/auth";

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
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Failed to fetch workspaces.",
        },
        { status: res.status },
      );
    }

    const body = await res.json();
    const data: GetWorkspacesResponse = body.data;

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
