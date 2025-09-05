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
      if (session.user) {
        // attach user id
        session.user.id = token.sub

        // attach role
        if (session.user.email === "sambhavarya87@gmail.com") {
          session.user.role = "admin"
        } else {
          session.user.role = "user"
        }
      }
      return session
    },
  },
}
