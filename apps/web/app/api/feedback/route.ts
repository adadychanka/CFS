import { NextRequest, NextResponse } from "next/server";

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

    const skip = (page - 1) * limit;

    if (Math.random() < 0.1) {
      throw new Error("Random simulated error");
    }

    // TODO: 401 is not caught
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

    const feedback = await res.json();

    return NextResponse.json({ success: true, feedback });
  } catch (e: unknown) {
    // TODO: only 500 caught,
    const message = e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
