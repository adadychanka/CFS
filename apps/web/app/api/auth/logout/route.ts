import { NextResponse } from "next/server";
import { API_URL } from "@/constants/api";

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  return NextResponse.json({ success: true });
}
