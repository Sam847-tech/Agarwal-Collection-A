// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // ✅ Protect all /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      // Not logged in → redirect to login
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // ✅ Gmail restriction (only your account can access)
    if (token.email !== "sambhavarya87@gmail.com") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return NextResponse.next()
}

// ✅ Apply middleware only for /admin/*
export const config = {
  matcher: ["/admin/:path*"],
}
