import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "@/app/lib/Auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let session = request.cookies.get("session");
  await verify(undefined).then((res) => {
    if (res) {
      // console.log("verified");
      return NextResponse.next();
    } else {
      // console.log("unverified");
      return Response.json(
        { success: false, message: "authentication failed" },
        { status: 401 }
      );
    }
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/s3-upload/:path*",
};
