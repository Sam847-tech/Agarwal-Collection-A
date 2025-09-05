// app/after-login/page.tsx
"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AfterLoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // ⏳ While session is loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  // 🔒 If no session → go to login
  if (!session) {
    router.replace("/login")
    return null
  }

  // 👤 If normal user → skip directly to app
  if (session.user?.role !== "admin") {
    router.replace("/")
    return null
  }

  // 🛠️ If admin → show choices
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-xl font-bold">Welcome, Admin 👋</h1>
      <p>Where would you like to go?</p>
      <div className="flex space-x-4">
        <Button onClick={() => router.push("/")}>Go to App</Button>
        <Button onClick={() => router.push("/admin")}>Go to Admin</Button>
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
