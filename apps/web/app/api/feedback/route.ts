import { NextRequest, NextResponse } from "next/server";
import { GetFeedbackResponse } from "@/types/http";
import { auth } from "@/auth/auth";
import { FEEDBACK_FILTERS } from "@/constants/constants";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);
    const sentimentParam = `${req.nextUrl.searchParams.get("sentiment")}`;
    const sentiment = FEEDBACK_FILTERS.includes(sentimentParam)
      ? sentimentParam
      : null;

    const res = await fetch(
      `${process.env.BACKEND_API}/api/feedback?limit=${limit}&page=${page}${sentiment ? `&sentiment=${sentiment}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const body = await res.json();
    const data: GetFeedbackResponse = body.data;

    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
