import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminDashboardClient from "./AdminDashboardClient"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  // ❌ If no session → redirect to login
  if (!session) {
    redirect("/login")
  }

  // ❌ If not admin → redirect to unauthorized
  if (session.user?.role !== "admin") {
    redirect("/unauthorized")
  }

  // ✅ If authorized → render client dashboard
  return <AdminDashboardClient />
}
