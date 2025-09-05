"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { useAppStore } from "@/lib/store"
import { mockProducts } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  IndianRupee,
  ArrowUpRight,
  Eye,
} from "lucide-react"

export default function AdminDashboardClient() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 🔒 Client-side protection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/unauthorized")
    }
  }, [status, session, router])

  if (status === "loading") {
    return <p className="flex justify-center items-center h-screen">Loading...</p>
  }

  // ✅ Only show content for admins
  if (!session || session.user?.role !== "admin") {
    return null
  }

  // Store + mock data
  const orders = useAppStore((state) => state.orders)
  const totalProducts = mockProducts.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  const metrics = [
    { title: "Total Revenue", value: `₹${totalRevenue}`, change: "+12%", icon: IndianRupee },
    { title: "Total Orders", value: totalOrders.toString(), change: "+8%", icon: ShoppingCart },
    { title: "Products", value: totalProducts.toString(), change: "+2", icon: Package },
    { title: "Customers", value: "156", change: "+5%", icon: Users },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your store."
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((m) => (
              <Card key={m.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{m.title}</p>
                      <p className="text-2xl font-bold">{m.value}</p>
                    </div>
                    <m.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center mt-2 text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" /> {m.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.customerInfo.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          ₹{order.total.toLocaleString()}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            order.status === "pending"
                              ? "border-yellow-500 text-yellow-700"
                              : order.status === "confirmed"
                              ? "border-blue-500 text-blue-700"
                              : order.status === "delivered"
                              ? "border-green-500 text-green-700"
                              : "border-gray-500 text-gray-700"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center">
                    No recent orders
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Package className="h-6 w-6" />
                  Add New Product
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <ShoppingCart className="h-6 w-6" />
                  Process Orders
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
