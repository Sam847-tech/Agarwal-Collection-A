// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminDashboardClient from "./AdminDashboardClient"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  // ❌ If no session → login
  if (!session) {
    redirect("/login")
  }

  // ❌ If not your Gmail → unauthorized
  if (session.user?.email !== "sambhavarya87@gmail.com") {
    redirect("/unauthorized")
  }

  // ✅ If authorized → render client dashboard
  return <AdminDashboardClient />
}
