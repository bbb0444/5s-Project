import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const auth = req.nextUrl.searchParams.get("code");
    console.log(auth);
    if (auth === "bbportfolioweb") {
      console.log("authed");
      try {
        const result = await sql`
          SELECT code FROM codes`;

        const codes = result.rows.map((row) => row.code);
        // console.log(codes);
        fs.writeFileSync(
          path.resolve(__dirname, "codes.json"),
          JSON.stringify(codes, null, 2)
        );
        return new Response("success :)");
      } catch (error) {
        console.error("Error", error);
        return new Response("error", { status: 405 });
      }
    }
  }
  return new Response("not allowed", { status: 405 });
}
