import { auth } from "@/auth/auth";
import { api } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
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
    const data = await api.get("/api/feedback/sentiment-summary");

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
