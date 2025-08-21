import { NextRequest, NextResponse } from "next/server";
import { getFeedbackResponse } from "@/types/http";
import { auth } from "@/auth/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

    const res = await fetch(
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      `${process.env.BACKEND_API}/api/feedback?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const body = await res.json();
    const data: getFeedbackResponse = body.data;

    return NextResponse.json(data);
  } catch (e: unknown) {
    // TODO: only 500 caught,
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
