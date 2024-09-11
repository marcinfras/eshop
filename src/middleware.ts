// import { getSession } from "next-auth/react";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   const currentUser = request.cookies.get('currentUser')?.value

  const isAuth = request.cookies.get("next-auth.session-token")?.value;

  //   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //     return Response.redirect(new URL('/dashboard', request.url))
  //   }

  if (!isAuth && request.nextUrl.pathname.startsWith("/success")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuth && request.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/account", "/account/(.*)", "/success"],
};

// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const user = "";

//   if (!user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/account"],
// };
