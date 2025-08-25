import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_TABLE_DATA } from "@/app/api/feedback/sample/sample-data";

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

    const total = SAMPLE_TABLE_DATA.length;
    const pages = Math.ceil(total / limit);

    // clamp page to valid range
    const safePage = Math.min(Math.max(page, 1), pages);

    const start = (safePage - 1) * limit;
    const end = start + limit;

    const feedbacks = SAMPLE_TABLE_DATA.slice(start, end);

    const body = {
      feedbacks,
      pagination: {
        limit,
        page: safePage,
        total,
        pages,
      },
    };

    return NextResponse.json(body);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
