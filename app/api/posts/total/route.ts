import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Category, CategoryMap } from "@/app/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      const category = req.nextUrl.searchParams.get("category");
      const category_key = CategoryMap[category as Category];
      const result = await sql`
        SELECT uploads FROM categories 
        WHERE category_key = ${category_key}`;
      const posts = result.rows;

      return NextResponse.json({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return new Response("error fetching posts", { status: 405 });
    }
  } else {
    return new Response("not allowed", { status: 405 });
  }
}
