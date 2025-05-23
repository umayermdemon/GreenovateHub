import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = { member: [/^\/member/], admin: [/^\/admin/] };

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const userInfo = await getUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        // new URL(`http://localhost:3000/login?redirectPath=${pathname}`, req.url)
        new URL(
          `https://greeni-circle-client.vercel.app/login?redirectPath=${pathname}`,
          req.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
};

export const config = {
  matcher: ["/login", "/admin", "/admin/:path*", "/member", "/member/:path*"],
};
