import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protect only specific routes
  const protectedPaths = ["/account", "/my-order","/dashboard"];
  const currentPath = req.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/my-order"  , "/dashboard"],
};
