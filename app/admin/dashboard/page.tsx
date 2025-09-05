import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminDashboardClient from "./AdminDashboardClient"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  // ❌ No session → redirect to login
  if (!session) {
    redirect("/login")
  }

  // ❌ Not admin → redirect to unauthorized
  if (session.user?.role !== "admin") {
    redirect("/unauthorized")
  }

  // ✅ Admin → render dashboard
  return <AdminDashboardClient />
}
