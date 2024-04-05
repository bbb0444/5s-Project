import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const auth = req.nextUrl.searchParams.get("auth");
    const code = req.nextUrl.searchParams.get("code");
    console.log(auth);
    try {
      const result = await sql`
          SELECT code FROM codes`;

      const codes = result.rows.map((row) => row.code);
      const jsonString = JSON.stringify(codes, null, 2); // The second parameter is for formatting the output

      if (codes.includes(auth)) {
        // Specify the path to the file
        const filePath = "./codes.json"; // Adjust the path as necessary

        // Write the JSON string to the file
        fs.writeFile(filePath, jsonString, "utf8").then((err: any) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log("File has been created");
        });
        // console.log(codes);

        return new Response("success :)");
      } else {
        return new Response("invalid code", { status: 405 });
      }
    } catch (error) {
      console.error("Error", error);
      return new Response("error", { status: 405 });
    }
  }
  return new Response("not allowed", { status: 405 });
}
