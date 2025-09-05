// app/after-login/page.tsx
"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AfterLoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-background">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-600">Checking your account...</p>
      </div>
    )
  }

  if (!session) {
    router.replace("/login")
    return null
  }

  if (session.user?.role !== "admin") {
    router.replace("/")
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-background">
      <div className="flex flex-col items-center space-y-8 text-foreground">
        {/* ✅ Logo */}
        <Image
          src="/logo.png" // replace with your logo path in /public
          alt="Agarwal Collection"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome, Admin 👋
        </h1>

        <p className="text-lg text-muted-foreground">
          Where would you like to go?
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Button
            onClick={() => router.push("/")}
            className="px-6 py-3 text-lg rounded-xl"
          >
            Go to App
          </Button>
          <Button
            onClick={() => router.push("/admin")}
            className="px-6 py-3 text-lg rounded-xl"
          >
            Go to Admin
          </Button>
          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-6 py-3 text-lg rounded-xl"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
