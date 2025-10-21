"use client"

import { useEffect, useState } from "react"
import { getAllAttempts, deleteAttempt } from "@/lib/firestoreUtils"
import Navbar from "@/components/Navbar"

export default function HistoryPage() {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    loadAttempts()
  }, [])

  async function loadAttempts() {
    setLoading(true)
    const data = await getAllAttempts()
    setAttempts(data)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm("Delete this attempt?")) return

    setDeleting(id)
    const result = await deleteAttempt(id)

    if (result.success) {
      setAttempts(attempts.filter((a) => a.id !== id))
    } else {
      alert("Error deleting attempt!")
    }

    setDeleting(null)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl text-[#a78bfa] text-glow mb-2">ATTEMPT HISTORY</h2>
          <p className="text-sm text-foreground/70">All recorded login attempts</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse text-primary text-glow">LOADING...</div>
          </div>
        ) : attempts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-[#1e293b] pixel-border border-[#f43f5e] text-[#f43f5e]">
              <p className="text-lg mb-2">NO ATTEMPTS YET</p>
              <p className="text-xs opacity-70">Add your first attempt on the dashboard!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-6 bg-[#1e293b] pixel-border border-[#a78bfa] hover:pixel-glow transition-all animate-fade-in"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm text-[#facc15]">{formatDate(attempt.date)}</div>
                  <button
                    onClick={() => handleDelete(attempt.id)}
                    disabled={deleting === attempt.id}
                    className="px-3 py-1 bg-[#f43f5e] text-[#0d0d0d] text-xs pixel-border border-[#f43f5e] hover:pixel-glow transition-all disabled:opacity-50"
                  >
                    {deleting === attempt.id ? "..." : "DEL"}
                  </button>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-[#22d3ee] text-glow mb-2">{attempt.numberOfTries}</div>
                  <div className="text-xs text-white/80">{attempt.numberOfTries === 1 ? "TRY" : "TRIES"}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {attempts.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-block p-4 bg-[#1e293b] pixel-border border-[#10b981] text-[#10b981]">
              <p className="text-sm">Total Records: {attempts.length}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
