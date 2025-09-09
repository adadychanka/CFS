import { auth } from "@/auth/auth";
import { NextResponse } from "next/server";
import { getServerApi } from "@/lib/server-api";
import { FetchError } from "@/lib/errors";
import type { AdminMetricsResponse } from "@/types/metrics";
import { getAdminMetrics } from "@/lib/get-admin-metrics";

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
    const response = await api.get("/api/admin/metrics");

    if (!response.ok) {
      const result: AdminMetricsResponse = await response.json();

      return NextResponse.json(
        { success: false, message: result.message },
        { status: response.status },
      );
    }

    const result: AdminMetricsResponse = await response.json();

    if (!result.data) {
      return NextResponse.json(
        {
          success: true,
          message: "empty data",
          data: [],
        },
        {
          status: 200,
        },
      );
    }

    if (result.data) {
      const metrics = getAdminMetrics(result.data);

      return NextResponse.json(
        {
          success: true,
          message: "ok",
          data: metrics,
        },
        {
          status: 200,
        },
      );
    }
  } catch (error) {
    if (error instanceof FetchError)
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.status,
        },
      );

    if (error instanceof Error)
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
