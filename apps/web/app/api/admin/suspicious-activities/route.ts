import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";
import { GetSuspiciousActivitiesResponse } from "@/types/http";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, status: 401, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { page, limit } = getPaginationParamsFromNextRequest(req);

    const requestUrl = new URL(
      "/api/admins/suspicious-activities",
      process.env.BACKEND_API,
    );
    requestUrl.searchParams.set("page", page.toString());
    requestUrl.searchParams.set("limit", limit.toString());

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
          message: "Failed to fetch suspicious activities.",
        },
        { status: res.status },
      );
    }

    const body = await res.json();
    const data: GetSuspiciousActivitiesResponse = body.data;

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
