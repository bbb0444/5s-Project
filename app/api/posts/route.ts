import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Category, CategoryMap } from "@/app/lib/types";
import { getPosts } from "@/app/lib/mockData";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    const from = req.nextUrl.searchParams.get("from");
    const count = req.nextUrl.searchParams.get("count");
    const category = req.nextUrl.searchParams.get("category");

    if (
      !count ||
      isNaN(Number(count)) ||
      !category ||
      !from ||
      isNaN(Number(from))
    ) {
      return new Response("error invalid count or category parameter", {
        status: 400,
      });
    }

    try {
      const category_key = CategoryMap[category as Category];
      console.log(category, category_key, count);
      const result = await sql`
        SELECT * FROM uploads
        WHERE category_key = ${category_key}
        LIMIT ${parseInt(count)}
        OFFSET ${parseInt(from)}`;
      const posts = result.rows;
      // const posts = await getPosts();
      return NextResponse.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return new Response("error fetching posts", { status: 405 });
    }
  } else {
    return new Response("not allowed", { status: 405 });
  }
}
