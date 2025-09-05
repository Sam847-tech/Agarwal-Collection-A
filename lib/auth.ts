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
    async jwt({ token }) {
      // ✅ Assign role during JWT creation
      if (token.email === "sambhavarya87@gmail.com") {
        token.role = "admin"
      } else {
        token.role = "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // attach user id
        session.user.id = token.sub
        // ✅ pull role from token
        session.user.role = token.role as string
      }
      return session
    },
  },
}
