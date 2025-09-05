"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AfterLoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="flex justify-center items-center h-screen">Loading...</p>
  }

  if (!session) return null

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 text-center">
      <h1 className="text-2xl font-bold">
        Welcome, {session.user?.name || "User"} 👋
      </h1>
      <p className="text-gray-600">What would you like to do next?</p>

      <div className="flex gap-4">
        {/* Go to main app */}
        <Button onClick={() => router.push("/")}>Go to App</Button>

        {/* Show Admin only if role === admin */}
        {session.user?.role === "admin" && (
          <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
            Go to Admin
          </Button>
        )}

        {/* Sign Out */}
        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
