"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/lib/data"
import { useAppStore } from "@/lib/store"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const orders = useAppStore((state) => state.orders ?? [])  // ✅ Hook at top

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="flex justify-center items-center h-screen">Loading...</p>
  }

  if (!session?.user?.email) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">🚫 Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <Button onClick={() => signOut({ callbackUrl: "/login" })} className="mt-4">
          Sign Out
        </Button>
      </div>
    )
  }

  if (session.user.email !== "sambhavarya87@gmail.com") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">🚫 Access Denied</h1>
        <p>This page is restricted.</p>
        <Button onClick={() => signOut({ callbackUrl: "/login" })} className="mt-4">
          Sign Out
        </Button>
      </div>
    )
  }

  const totalProducts = mockProducts?.length ?? 0
  const totalOrders = orders?.length ?? 0
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total ?? 0), 0)

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Dashboard" subtitle="Welcome back! Here's what's happening with your store." />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><CardContent className="p-6"><p>Total Products</p><p>{totalProducts}</p></CardContent></Card>
            <Card><CardContent className="p-6"><p>Total Orders</p><p>{totalOrders}</p></CardContent></Card>
            <Card><CardContent className="p-6"><p>Total Revenue</p><p>₹{totalRevenue}</p></CardContent></Card>
            <Card><CardContent className="p-6"><p>User</p><p>{session.user.email}</p></CardContent></Card>
          </div>
        </main>
      </div>
    </div>
  )
}
