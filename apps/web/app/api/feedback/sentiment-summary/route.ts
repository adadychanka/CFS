import { auth } from "@/auth/auth";
import { FetchError } from "@/lib/errors";
import { getServerApi } from "@/lib/server-api";
import { SentimentSummaryResponse } from "@/types/sentiment-summary";
import { NextResponse } from "next/server";

export async function GET() {
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
    const response = await api.get("/api/feedback/sentiment-summary");

    if (!response.ok) {
      return NextResponse.json({}, { status: response.status });
    }

    const result: SentimentSummaryResponse = await response.json();

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
