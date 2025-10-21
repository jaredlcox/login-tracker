"use client"

import { useState } from "react"
import { addAttempt } from "@/lib/firestoreUtils"
import { getRandomMessage } from "@/utils/calcStats"
import PixelConfetti from "./PixelConfetti"

export default function AddAttemptForm({ onSuccess }) {
  const [numberOfTries, setNumberOfTries] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!numberOfTries || numberOfTries < 1) {
      setMessage("Please enter a valid number!")
      return
    }

    setLoading(true)
    const result = await addAttempt(numberOfTries)

    if (result.success) {
      setMessage(getRandomMessage())
      setShowConfetti(true)
      setNumberOfTries("")

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000)

      // Clear message after 5 seconds
      setTimeout(() => setMessage(""), 5000)

      // Notify parent to refresh data
      if (onSuccess) onSuccess()
    } else {
      setMessage("Error saving attempt. Check Firebase config!")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {showConfetti && <PixelConfetti />}

      <div className="p-8 bg-[#1e293b] pixel-border border-[#22d3ee] pixel-glow">
        <h3 className="text-xl text-[#22d3ee] text-glow mb-6 text-center">ADD NEW ATTEMPT</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="tries" className="block text-sm mb-3 text-foreground/80">
              How many tries did it take?
            </label>
            <input
              id="tries"
              type="number"
              min="1"
              value={numberOfTries}
              onChange={(e) => setNumberOfTries(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0d0d] border-2 border-[#22d3ee] text-foreground text-lg focus:outline-none focus:pixel-glow transition-all"
              placeholder="Enter number..."
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#22d3ee] text-[#0d0d0d] text-lg font-bold pixel-border border-[#22d3ee] hover:pixel-glow hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {loading ? "SAVING..." : "SUBMIT ATTEMPT"}
          </button>
        </form>

        {message && (
          <div className="mt-6 p-4 bg-[#a78bfa]/20 border-2 border-[#a78bfa] text-[#a78bfa] text-center animate-bounce">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
