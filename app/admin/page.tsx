import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AdminPage() {
  // Get session from NextAuth
  const session = await getServerSession(authOptions)

  // Redirect to login if not logged in
  if (!session) {
    redirect("/login")
  }

  // If logged in → redirect to dashboard
  redirect("/admin/dashboard")
}
