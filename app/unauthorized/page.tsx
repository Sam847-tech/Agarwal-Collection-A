// app/unauthorized/page.tsx
"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-3xl font-bold">🚫 Access Denied</h1>
      <p className="text-gray-600">You do not have permission to view this page.</p>

      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign Out
      </Button>
    </div>
  )
}
