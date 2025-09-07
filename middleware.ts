// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // Protect only specific routes
//   const protectedPaths = ["/account", "/my-order", "/dashboard"];
//   const currentPath = req.nextUrl.pathname;
//   const isProtected = protectedPaths.some((path) =>
//     currentPath.startsWith(path)
//   );

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   if (isProtected && token?.role !== "SELLER") {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//     // if (isProtected && !token) {
//   //   return NextResponse.redirect(new URL("/sign-in", req.url));
//   // }


//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/account", "/account/:path*", "/my-order", "/dashboard", "/dashboard/:path*"],
// };


import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const currentPath = req.nextUrl.pathname;

  const isDashboardRoute = currentPath.startsWith("/dashboard");
  const isProtectedRoute =
    currentPath.startsWith("/account") || currentPath.startsWith("/my-order");

 
  if ((isDashboardRoute || isProtectedRoute) && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🧑‍💼 Non-SELLERS should not access /dashboard
  if (isDashboardRoute && token?.role !== "SELLER") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// Apply only to protected routes
export const config = {
  matcher: [
    "/account",
    "/account/orders",
    "/account/settings",
    "/account/profile",
     "/account/privacy",
       "/ccount/terms",
    "/my-order",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
