// lib/auth.ts
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

const adminEmails = ["sambhavarya87@gmail.com", "another.admin@example.com"]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // attach user id
        session.user.id = token.sub

        // assign role
        if (adminEmails.includes(session.user.email || "")) {
          session.user.role = "admin"
        } else {
          session.user.role = "user"
        }
      }
      return session
    },
  },
}
