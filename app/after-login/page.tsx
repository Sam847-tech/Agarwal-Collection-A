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
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
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
    <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center space-y-8 text-white transition-opacity duration-700 opacity-100">
        {/* ✅ Logo */}
        <Image
          src="/logo.png" // replace with your logo path in /public
          alt="Agarwal Collection"
          width={120}
          height={120}
          className="rounded-full shadow-lg transform transition duration-500 hover:scale-105"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold transition-transform duration-700 transform translate-y-0">
          Welcome, Admin 👋
        </h1>

        <p className="text-lg text-gray-200 transition-opacity duration-700 delay-150 opacity-100">
          Where would you like to go?
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6 transition-transform duration-700 delay-300 transform translate-y-0">
          <Button
            onClick={() => router.push("/")}
            className="px-6 py-3 text-lg rounded-xl bg-white text-black hover:bg-gray-200 transition"
          >
            Go to App
          </Button>
          <Button
            onClick={() => router.push("/admin")}
            className="px-6 py-3 text-lg rounded-xl bg-white text-black hover:bg-gray-200 transition"
          >
            Go to Admin
          </Button>
          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-6 py-3 text-lg rounded-xl transition"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
