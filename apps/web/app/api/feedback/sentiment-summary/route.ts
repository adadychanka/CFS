import { auth } from "@/auth/auth";
import { api } from "@/lib/api";
import { SentimentSummaryResponse } from "@/types/sentiment-summary";
import { NextResponse } from "next/server";

export async function GET() {
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
    const response = await api.get("/api/feedback/sentiment-summary");
    const result: SentimentSummaryResponse = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
