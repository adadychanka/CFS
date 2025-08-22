import { auth } from "@/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const type = req.nextUrl.searchParams.get("type");
    const format = req.nextUrl.searchParams.get("format");

    const res = await fetch(
      `${process.env.BACKEND_API}/api/feedback/report?type=${type}&format=${format}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const contentDisposition = res.headers.get("content-disposition");
    const contentType = res.headers.get("content-type");

    if (!contentDisposition || !contentType) {
      return NextResponse.json(
        { message: "Missing required headers" },
        { status: 500 },
      );
    }

    return new NextResponse(res.body, {
      headers: {
        "content-disposition": contentDisposition,
        "content-type": contentType,
      },
      status: res.status,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
