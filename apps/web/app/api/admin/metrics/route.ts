import { auth } from "@/auth/auth";
import { NextResponse } from "next/server";
import { getServerApi } from "@/lib/server-api";
import type { AdminMetricsResponse } from "@/types/metrics";
import { getAdminMetrics } from "@/lib/get-admin-metrics";
import { getUnknownErrorMessage } from "@/lib/get-unknown-error-message";
import { getErrorMessage } from "@/lib/get-error-message";

export async function GET() {
  const api = await getServerApi();
  const session = await auth();

  if (session?.user.token) {
    api.setToken(session.user.token);
  } else {
    return NextResponse.json(
      {
        success: false,
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
      let errorMessage = `Request failed with status ${response.status}`;
      errorMessage = (await getErrorMessage(response)) || "Unexpected error.";

      return NextResponse.json(
        { success: false, message: errorMessage },
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
