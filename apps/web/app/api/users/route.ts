import { NextRequest, NextResponse } from "next/server";
import { GetUsersResponse } from "@/types/http";
import { auth } from "@/auth/auth";
import * as process from "node:process";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { page, limit } = getPaginationParamsFromNextRequest(req);
    const search = req.nextUrl.searchParams.get("search") || "";
    const isSearch = search.length >= 3;

    const requestUrl = isSearch
      ? new URL("/api/users/search", process.env.BACKEND_API)
      : new URL("/api/users", process.env.BACKEND_API);

    if (isSearch) {
      requestUrl.searchParams.set("email", search);
    } else {
      requestUrl.searchParams.set("page", page.toString());
      requestUrl.searchParams.set("limit", limit.toString());
    }

    const res = await fetch(requestUrl.toString(), {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const body = await res.json();
    console.log("body", body);
    const data: GetUsersResponse = isSearch ? { users: body.data } : body.data;

    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
