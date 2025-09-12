import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";
import { GetSuspiciousActivitiesResponse } from "@/types/http";
import { getUnknownErrorMessage } from "@/lib/get-unknown-error-message";
import { getErrorMessage } from "@/lib/get-error-message";

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
      const errorMessage = (await getErrorMessage(res)) || "Unexpected error.";

      return NextResponse.json(
        { success: false, message: errorMessage },
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
  } catch (error) {
    const errorResponse = await getUnknownErrorMessage(error);
    return NextResponse.json(
      {
        success: false,
        message: errorResponse.error,
      },
      { status: errorResponse.status },
    );
  }
}
