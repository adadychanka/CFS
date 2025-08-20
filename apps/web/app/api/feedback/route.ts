import { NextRequest, NextResponse } from "next/server";
import { SentimentAnalysisResult } from "@/types/sentiment-analysis-result";

export async function GET(req: NextRequest) {
  try {
    // TODO:
    //  Connect to real API ;(
    //  connect pagination limits to the API meta
    //  401 is not caught
    //  test API has no pagination

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    if (Math.random() < 0.1) {
      throw new Error("Random simulated error");
    }

    const res = await fetch(
      `https://dummyjson.com/c/c822-5738-40dc-95b7?limit=${limit}&skip=${skip}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

    const feedback: SentimentAnalysisResult[] = await res.json();

    return NextResponse.json({ success: true, feedback });
  } catch (e: unknown) {
    // TODO:
    //  only 500 caught,
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
