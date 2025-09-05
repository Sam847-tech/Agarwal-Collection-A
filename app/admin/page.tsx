// app/admin/page.tsx
import { redirect } from "next/navigation"

export default function AdminPage() {
  // Middleware already checks authentication
  // Just redirect /admin → /admin/dashboard
  redirect("/admin/dashboard")
}
