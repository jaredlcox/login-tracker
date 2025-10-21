"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b-4 border-primary bg-card mb-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl text-primary text-glow text-center md:text-left">LOGIN TRY TRACKER</h1>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className={`px-6 py-3 pixel-border transition-all hover:pixel-glow ${
                pathname === "/" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-primary/20"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/history"
              className={`px-6 py-3 pixel-border transition-all hover:pixel-glow ${
                pathname === "/history"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-primary/20"
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
