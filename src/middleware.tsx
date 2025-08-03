import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("user")?.value;
    const { pathname } = req.nextUrl;

    // const isPublicPage = pathname === "/";
    const isAdminPage = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/login";

    // if (!token && isAdminPage) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    // if (token && isLoginPage) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
};
