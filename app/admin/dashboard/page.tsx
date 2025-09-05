// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminDashboardClient from "./AdminDashboardClient"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  // ❌ If no session, redirect to login
  if (!session) {
    redirect("/login")
  }

  // ❌ Restrict to only your Gmail
  if (session.user?.email !== "sambhavarya87@gmail.com") {
    redirect("/unauthorized") // you can create this page if needed
  }

  // ✅ Render the client-side dashboard component
  return <AdminDashboardClient />
}
