"use server";

import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import { RateLimitResponseData } from "@/types/rate-limit";

export async function submitRateLimit(rateLimit: RateLimitResponseData) {
  const api = await getServerApi();
  try {
    const session = await auth();
    if (session?.user.token) {
      api.setToken(session.user.token);
    } else {
      return { status: 401, message: "Unauthorized!" };
    }
    const data = await api.patch("/api/admin/rate-limit", rateLimit);
    return await data.json();
  } catch (error) {
    console.log(error);
  }
}
