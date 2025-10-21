"use client"

import { useEffect, useState } from "react"
import { getAllAttempts } from "@/lib/firestoreUtils"
import { calculateStats, filterAttemptsByPeriod } from "@/utils/calcStats"
import StatCard from "@/components/StatCard"
import Navbar from "@/components/Navbar"
import AddAttemptForm from "@/components/AddAttemptForm"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    runningTotal: 0,
    runningAverage: 0,
    totalAttempts: 0,
    averageByDay: 0,
    averageByWeek: 0,
    averageByMonth: 0,
    averageByYear: 0,
  })
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState("All Time")

  useEffect(() => {
    loadStats()
  }, [selectedFilter])

  async function loadStats() {
    setLoading(true)
    const attempts = await getAllAttempts()
    const filteredAttempts = filterAttemptsByPeriod(attempts, selectedFilter)
    const calculatedStats = calculateStats(filteredAttempts)
    setStats(calculatedStats)
    setLoading(false)
  }

  // Determine which cards to show based on filter
  const getVisibleCards = () => {
    switch (selectedFilter) {
      case "Today":
      case "Yesterday":
        return ["runningTotal", "totalAttempts", "averageByDay"]
      case "This Week":
      case "Last Week":
        return ["runningTotal", "totalAttempts", "averageByWeek"]
      case "This Month":
      case "Last Month":
        return ["runningTotal", "totalAttempts", "averageByMonth"]
      case "This Year":
      case "Last Year":
        return ["runningTotal", "totalAttempts", "averageByYear"]
      case "All Time":
      default:
        return ["runningTotal", "totalAttempts", "averageByDay"]
    }
  }

  const visibleCards = getVisibleCards()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl text-[#facc15] text-glow mb-2">SCOREBOARD</h2>
          <p className="text-sm text-foreground/70">Track your co-worker's login struggles</p>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-8 flex justify-center">
          <div className="inline-block">
            <label className="block text-xs text-[#22d3ee] mb-2 text-center">FILTER BY PERIOD</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-6 py-3 bg-[#1e293b] border-2 border-[#22d3ee] text-[#22d3ee] text-sm font-bold pixel-border hover:pixel-glow transition-all focus:outline-none focus:pixel-glow cursor-pointer"
            >
              <option value="All Time">ALL TIME</option>
              <option value="Today">TODAY</option>
              <option value="Yesterday">YESTERDAY</option>
              <option value="This Week">THIS WEEK</option>
              <option value="Last Week">LAST WEEK</option>
              <option value="This Month">THIS MONTH</option>
              <option value="Last Month">LAST MONTH</option>
              <option value="This Year">THIS YEAR</option>
              <option value="Last Year">LAST YEAR</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse text-primary text-glow">LOADING...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCards.includes("runningTotal") && (
              <StatCard label="RUNNING TOTAL" value={stats.runningTotal} color="primary" />
            )}
            {visibleCards.includes("runningAverage") && (
              <StatCard label="RUNNING AVERAGE" value={stats.runningAverage} color="purple" />
            )}
            {visibleCards.includes("totalAttempts") && (
              <StatCard label="TOTAL LOGINS" value={stats.totalAttempts} color="green" />
            )}
            {visibleCards.includes("averageByDay") && (
              <StatCard 
                label={selectedFilter === "All Time" ? "ALL TIME AVERAGE" : "AVERAGE BY DAY"} 
                value={stats.averageByDay} 
                color="gold" 
              />
            )}
            {visibleCards.includes("averageByWeek") && (
              <StatCard label="AVERAGE BY WEEK" value={stats.averageByWeek} color="red" />
            )}
            {visibleCards.includes("averageByMonth") && (
              <StatCard label="AVERAGE BY MONTH" value={stats.averageByMonth} color="purple" />
            )}
            {visibleCards.includes("averageByYear") && (
              <StatCard label="AVERAGE BY YEAR" value={stats.averageByYear} color="green" />
            )}
          </div>
        )}

        <div className="mt-12">
          <AddAttemptForm onSuccess={loadStats} />
        </div>
      </main>
    </div>
  )
}
