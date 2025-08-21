import { NextRequest, NextResponse } from "next/server";
import { GetFeedbackResponse } from "@/types/http";
import { auth } from "@/auth/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await req.json();
    const res = await fetch(`${process.env.BACKEND_API}/api/feedback/manual`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({
        feedback: reqBody.feedback,
      }),
    });

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
