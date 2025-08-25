import { auth } from "@/auth/auth";
import { type GroupedFeedbackResponse } from "@/types/grouped-feedback";
import { NextResponse } from "next/server";
import { getServerApi } from "@/lib/server-api";

const api = await getServerApi();
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
    const response = await api.get("/api/feedback/grouped");
    const result: GroupedFeedbackResponse = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
