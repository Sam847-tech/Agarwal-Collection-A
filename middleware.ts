// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  // check if user is authenticated
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Protect all /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      // redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

// Apply middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
