import { NextResponse } from "next/server";
import { API_URL } from "@/constants/api";
import { AUTH_MESSAGES } from "@/constants/response-messages";

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({
      success: true,
      message: AUTH_MESSAGES.LOGOUT.NO_TOKEN,
    });
  }

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.error(AUTH_MESSAGES.LOGOUT.ERROR, e);
  }

  return NextResponse.json({
    success: true,
    message: AUTH_MESSAGES.LOGOUT.SUCCESS,
  });
}
