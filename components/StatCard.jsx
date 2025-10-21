"use client"

import { useEffect, useState } from "react"

export default function StatCard({ label, value, color = "primary" }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Animate count up from 0 to value
    const duration = 1000 // 1 second
    const steps = 30
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current * 10) / 10)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const colorClasses = {
    primary: "border-[#22d3ee] text-[#22d3ee]",
    purple: "border-[#a78bfa] text-[#a78bfa]",
    gold: "border-[#facc15] text-[#facc15]",
    green: "border-[#10b981] text-[#10b981]",
    red: "border-[#f43f5e] text-[#f43f5e]",
  }

  return (
    <div
      className={`p-6 bg-[#1e293b] pixel-border pixel-glow ${colorClasses[color]} transition-all hover:scale-105 animate-fade-in`}
    >
      <div className="text-sm mb-4 opacity-80">{label}</div>
      <div className="text-4xl font-bold text-glow">{displayValue}</div>
    </div>
  )
}
