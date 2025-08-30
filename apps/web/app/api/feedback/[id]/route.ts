import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_API}/api/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const body = await res.json();
    const data: SentimentAnalysisResult = body.data;

    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
