import { NextRequest, NextResponse } from "next/server";
import { GetUsersResponse } from "@/types/http";
import { auth } from "@/auth/auth";
import * as process from "node:process";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    console.log("session", session);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

    const res = await fetch(
      `${process.env.BACKEND_API}/api/users?limit=${limit}&page=${page}`,
      {
        headers: {
          // Authorization: `Bearer ${session.user.token}`,
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          Authorization: `Bearer ${process.env.TEMP_ADMIN_TOKEN}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const body = await res.json();
    const data: GetUsersResponse = body.data;

    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
