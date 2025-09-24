"use server";

import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import type {
  RateLimitResponse,
  RateLimitResponseData,
} from "@/types/rate-limit";

export async function submitRateLimit(rateLimits: RateLimitResponseData[]) {
  const api = await getServerApi();

  try {
    const session = await auth();

    if (!session?.user.token) {
      return { status: 401, message: "Unauthorized!" };
    }

    api.setToken(session.user.token);

    const responses: RateLimitResponse[] = await Promise.all(
      rateLimits.map(async (rateLimit) => {
        const res = await api.patch("/api/admins/rate-limit", rateLimit);
        return await res.json();
      }),
    );

    return {
      success: true,
      status: 200,
      message: "Rate limits updated successfully",
      results: responses,
    };
  } catch (error) {
    console.error("Error updating rate limits:", error);
    if (error instanceof Error) {
      return {
        status: 500,
        message: error?.message || "Internal server error",
      };
    }
    return {
      status: 500,
      message: "Internal server error",
    };
  }
}
