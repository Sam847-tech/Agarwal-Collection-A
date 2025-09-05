// app/admin/dashboard/page.tsx
import AdminDashboardClient from "./AdminDashboardClient"

export default function AdminDashboardPage() {
  // Middleware already ensures only authenticated users can reach here.
  // Restrict Gmail check can be handled inside AdminDashboardClient.
  return <AdminDashboardClient />
}
