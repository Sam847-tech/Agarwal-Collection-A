import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import SessionProviderWrapper from "./SessionProviderWrapper"
import UserMenu from "@/components/UserMenu"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Agarwal Collection",
  description:
    "Discover exquisite Sarees, Suits, and Lehengas at Agarwal Collection. Traditional elegance meets modern style.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${playfair.variable} ${manrope.variable}`}>
        <SessionProviderWrapper>
          {/* ✅ Fixed Navbar */}
          <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
            <h1 className="text-lg md:text-xl font-bold tracking-wide">
              Agarwal Collection
            </h1>
            <UserMenu />
          </header>

          {/* ✅ Add top padding so content isn’t hidden behind navbar */}
          <main className="pt-16">
            <Suspense fallback={null}>{children}</Suspense>
          </main>

          <Analytics />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
