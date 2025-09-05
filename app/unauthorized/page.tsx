"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
      <h1 className="text-4xl font-bold text-red-600">🚫 Access Denied</h1>
      <p className="text-gray-600 text-lg">
        You don’t have permission to view this page.
      </p>

      <Button 
        variant="destructive" 
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign Out
      </Button>
    </div>
  )
}
