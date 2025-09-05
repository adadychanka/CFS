import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { paginate } from "@/utils/pagination";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, status: 401, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const requestUrl = new URL(
      "/api/admin/suspicious-activities",
      process.env.BACKEND_API,
    );

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
    const { page, limit } = getPaginationParamsFromNextRequest(req);
    const { items, pagination } = paginate(body.data, page, limit);

    return NextResponse.json({
      success: true,
      status: 200,
      data: {
        suspiciousActivities: items,
        pagination,
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, status: 500, message },
      { status: 500 },
    );
  }
}
