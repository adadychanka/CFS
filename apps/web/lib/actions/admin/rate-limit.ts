"use server";

import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import type {
  RateLimitPatchResponse,
  RateLimitResponseData,
  RateLimitTarget,
} from "@/types/rate-limit";
import { revalidatePath } from "next/cache";

export async function submitRateLimit(rateLimits: RateLimitResponseData[]) {
  const updateResult: {
    success: boolean;
    message: string;
    target: RateLimitTarget | "Unknown";
  }[] = [];
  const api = await getServerApi();

  try {
    const session = await auth();

    if (!session?.user.token) {
      return { status: 401, message: "Unauthorized!" };
    }

    api.setToken(session.user.token);

    const responses = await Promise.allSettled(
      rateLimits.map(async (rateLimit) => {
        const res = await api.patch("/api/admins/rate-limit", rateLimit);
        const result: RateLimitPatchResponse = await res.json();
        return {
          success: result.success,
          message: result.message,
          target: rateLimit.target,
        };
      }),
    );

    responses.map((result) => {
      if (result.status === "fulfilled") {
        updateResult.push(result.value);
      } else {
        updateResult.push({
          target: "Unknown",
          message: "Updating failed",
          success: false,
        });
      }
    });

    const isAllSuccessful = updateResult.every((response) => response.success);
    revalidatePath("/api/admins/rate-limit");

    if (isAllSuccessful) {
      return {
        success: isAllSuccessful,
        status: 200,
        message: "Rate limits updated successfully",
        results: updateResult,
      };
    } else {
      const isSomeSuccessful = updateResult.some(
        (response) => response.success,
      );
      return {
        success: isSomeSuccessful,
        status: 200,
        message: isSomeSuccessful
          ? "Not all rate limits updated."
          : "An error occurred.",
        results: updateResult,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        status: 500,
        message: error?.message || "Internal server error",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
}
