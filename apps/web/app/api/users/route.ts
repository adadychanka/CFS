import { NextRequest, NextResponse } from "next/server";
import { GetUsersResponse } from "@/types/http";
import { auth } from "@/auth/auth";
import * as process from "node:process";
import { getPaginationParamsFromNextRequest } from "@/utils/url-helpers";
import { USERS_SEARCH_QUERY_KEY } from "@/constants";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, status: 401, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { page, limit } = getPaginationParamsFromNextRequest(req);
    const search = req.nextUrl.searchParams.get(USERS_SEARCH_QUERY_KEY) || "";
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
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Failed to fetch users.",
        },
        { status: res.status },
      );
    }

    const body = await res.json();
    const data: GetUsersResponse = isSearch ? { users: body.data } : body.data;

    return NextResponse.json({
      success: true,
      status: 200,
      data,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, status: 500, message },
      { status: 500 },
    );
  }
}
