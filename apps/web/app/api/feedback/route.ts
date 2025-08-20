import { NextRequest, NextResponse } from "next/server";
import { getFeedbackResponse } from "@/types/http";

// type PaginationMeta = {
//   totalItems: number;
//   totalPages: number;
//   currentPage: number;
// };

export async function GET(req: NextRequest) {
  try {
    // TODO: Connect to real API ;(
    // TODO: connect pagination limits to the API meta
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

    // TODO: attach token
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const BACKEND_URL = process.env.BACKEND_API;
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const BACKEND_MY_TOKEN = process.env.BACKEND_MY_TOKEN;

    // TODO: 401 is not caught
    const res = await fetch(
      `${BACKEND_URL}/api/feedback?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${BACKEND_MY_TOKEN}`,
        },
      },
    );

    // TODO: Handle 401
    if (res.status === 401) {
      console.log("Signed out");
    }

    if (res.status === 403) {
      return NextResponse.json(
        { message: "Forbidden. You do not have access to this resource." },
        { status: 403 },
      );
    }

    if (res.status === 500) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }

    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

    const body = await res.json();
    const data: getFeedbackResponse = body.data;

    return NextResponse.json(data);
  } catch (e: unknown) {
    // TODO: only 500 caught,
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
