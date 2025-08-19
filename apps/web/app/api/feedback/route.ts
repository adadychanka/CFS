import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (Math.random() < 0.1) {
      throw new Error("Random simulated error");
    }

    const res = await fetch("https://dummyjson.com/products?limit=20&skip=10");
    const feedback = await res.json();

    return NextResponse.json({
      success: true,
      feedback,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
