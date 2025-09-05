"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Admin page error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-2xl font-bold">⚠️ Something went wrong</h1>
      <p className="text-gray-600">We couldn’t load this admin page.</p>

      <div className="flex gap-4">
        <Button onClick={() => reset()}>🔄 Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/admin/orders")}>
          Go to Orders
        </Button>
      </div>
    </div>
  )
}
