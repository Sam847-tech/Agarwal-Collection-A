"use client"

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function UserMenu() {
  const { data: session } = useSession()

  if (!session?.user) {
    return (
      <Button
        variant="secondary"
        onClick={() => (window.location.href = "/login")}
      >
        Login
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Profile Picture or Initials */}
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
          {session.user.name?.charAt(0) || "U"}
        </div>
      )}

      {/* User Info */}
      <div className="hidden md:block text-sm">
        <p className="font-medium">{session.user.name}</p>
        <p className="text-xs opacity-75">{session.user.email}</p>
      </div>

      {/* Sign Out */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign Out
      </Button>
    </div>
  )
}
