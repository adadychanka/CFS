import { NextRequest, NextResponse } from "next/server";
import { GetFeedbackResponse } from "@/types/http";
import { auth } from "@/auth/auth";
import {
  getPaginationParamsFromNextRequest,
  parseSentimentsQueryParam,
  transformSentimentsIntoSearchParams,
} from "@/utils/url-helpers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, status: 401, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Extracting params
    const { page, limit } = getPaginationParamsFromNextRequest(req);
    const sentiments = parseSentimentsQueryParam(req.nextUrl.searchParams);
    const parsedSentiments = transformSentimentsIntoSearchParams(sentiments);
    const isSampleMode =
      req.nextUrl.searchParams.get("isSampleMode") === "true";

    // Building URL
    const requestUrl = new URL(
      isSampleMode ? "/api/sample/feedback/filtered" : "/api/feedback",
      process.env.BACKEND_API,
    );

    requestUrl.searchParams.set("page", page.toString());
    requestUrl.searchParams.set("limit", limit.toString());
    parsedSentiments.forEach((value, key) => {
      requestUrl.searchParams.append(key, value);
    });

    // Send request
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
          message: "Failed to fetch analyzed feedback sentiments.",
        },
        { status: res.status },
      );
    }

    const body = await res.json();
    const data: GetFeedbackResponse = body.data;

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
