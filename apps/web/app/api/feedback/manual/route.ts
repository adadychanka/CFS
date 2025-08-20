import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: body.feedback,
      }),
    });

    return NextResponse.json(
      {
        message: "Your feedback are analyzed successfully",
      },
      {
        status: 201,
      },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
