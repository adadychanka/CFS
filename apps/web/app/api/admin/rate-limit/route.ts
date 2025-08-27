import { auth } from "@/auth/auth";
import { getServerApi } from "@/lib/server-api";
import { RateLimitResponse } from "@/types/rate-limit";
import { NextResponse } from "next/server";

export async function GET() {
  const api = await getServerApi();
  const session = await auth();
  console.log("next server");

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
    const response = await api.get("/api/admin/rate-limit");
    const result: RateLimitResponse = await response.json();
    console.log(result, "server");

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
