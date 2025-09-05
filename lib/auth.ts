// lib/auth.ts
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // redirect unauthenticated users to /login
  },
  callbacks: {
    async session({ session, token }) {
      // attach user id (if needed)
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
}
