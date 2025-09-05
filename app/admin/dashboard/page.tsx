// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AdminDashboardClient from "./AdminDashboardClient"
import { authOptions } from "@/lib/auth" // ✅ make sure you have this

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  // 🔒 Redirect unauthenticated
  if (!session) {
    redirect("/login")
  }

  // ✅ Only allow your Gmail
  if (session.user?.email !== "sambhavarya87@gmail.com") {
    redirect("/unauthorized") // optional page
  }

  return <AdminDashboardClient />
}
