"use client"

import { useEffect, useState } from "react"
import { getAllAttempts } from "@/lib/firestoreUtils"
import { calculateStats } from "@/utils/calcStats"
import StatCard from "@/components/StatCard"
import Navbar from "@/components/Navbar"
import AddAttemptForm from "@/components/AddAttemptForm"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    runningTotal: 0,
    runningAverage: 0,
    averageByDay: 0,
    averageByWeek: 0,
    averageByMonth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setLoading(true)
    const attempts = await getAllAttempts()
    const calculatedStats = calculateStats(attempts)
    setStats(calculatedStats)
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl text-[#facc15] text-glow mb-2">SCOREBOARD</h2>
          <p className="text-sm text-foreground/70">Track your co-worker's login struggles</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse text-primary text-glow">LOADING...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard label="RUNNING TOTAL" value={stats.runningTotal} color="primary" />
            <StatCard label="RUNNING AVERAGE" value={stats.runningAverage} color="purple" />
            <StatCard label="AVERAGE BY DAY" value={stats.averageByDay} color="gold" />
            <StatCard label="AVERAGE BY WEEK" value={stats.averageByWeek} color="green" />
            <StatCard label="AVERAGE BY MONTH" value={stats.averageByMonth} color="red" />
          </div>
        )}

        <div className="mt-12">
          <AddAttemptForm onSuccess={loadStats} />
        </div>
      </main>
    </div>
  )
}
