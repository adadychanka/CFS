import { auth } from "@/auth/auth";
import { type GroupedFeedbackResponse } from "@/types/grouped-feedback";
import { NextRequest, NextResponse } from "next/server";
import { getServerApi } from "@/lib/server-api";
import { FetchError } from "@/lib/errors";

export async function GET(req: NextRequest) {
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
    const isSampleMode =
      req.nextUrl.searchParams.get("isSampleMode") === "true";
    const requestUrl = isSampleMode
      ? "/api/sample/feedback/grouped"
      : "/api/feedback/grouped";

    const response = await api.get(requestUrl);

    if (!response.ok) {
      return NextResponse.json({}, { status: response.status });
    }

    const result: GroupedFeedbackResponse = await response.json();
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
