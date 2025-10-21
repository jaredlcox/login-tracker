// Filter attempts by time period
export function filterAttemptsByPeriod(attempts, filterType) {
  if (!attempts || attempts.length === 0 || filterType === "All Time") {
    return attempts
  }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return attempts.filter((attempt) => {
    // Parse date string as local time (YYYY-MM-DD format)
    const [year, month, day] = attempt.date.split("-").map(Number)
    const attemptDay = new Date(year, month - 1, day) // month is 0-indexed

    switch (filterType) {
      case "Today":
        return attemptDay.getTime() === today.getTime()

      case "Yesterday": {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        return attemptDay.getTime() === yesterday.getTime()
      }

      case "This Week": {
        const startOfWeek = new Date(today)
        const dayOfWeek = startOfWeek.getDay()
        const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Monday as start
        startOfWeek.setDate(diff)
        return attemptDay >= startOfWeek && attemptDay <= today
      }

      case "Last Week": {
        const startOfLastWeek = new Date(today)
        const dayOfWeek = startOfLastWeek.getDay()
        const diff = startOfLastWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) - 7
        startOfLastWeek.setDate(diff)
        const endOfLastWeek = new Date(startOfLastWeek)
        endOfLastWeek.setDate(endOfLastWeek.getDate() + 6)
        return attemptDay >= startOfLastWeek && attemptDay <= endOfLastWeek
      }

      case "This Month": {
        return (
          attemptDay.getMonth() === now.getMonth() && 
          attemptDay.getFullYear() === now.getFullYear()
        )
      }

      case "Last Month": {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        return (
          attemptDay.getMonth() === lastMonth.getMonth() &&
          attemptDay.getFullYear() === lastMonth.getFullYear()
        )
      }

      case "This Year": {
        return attemptDay.getFullYear() === now.getFullYear()
      }

      case "Last Year": {
        return attemptDay.getFullYear() === now.getFullYear() - 1
      }

      default:
        return true
    }
  })
}

// Calculate statistics from attempts data
export function calculateStats(attempts) {
  if (!attempts || attempts.length === 0) {
    return {
      runningTotal: 0,
      runningAverage: 0,
      totalAttempts: 0,
      averageByDay: 0,
      averageByWeek: 0,
      averageByMonth: 0,
      averageByYear: 0,
    }
  }

  // Total Attempts (number of records)
  const totalAttempts = attempts.length

  // Running Total (sum of all tries)
  const runningTotal = attempts.reduce((sum, attempt) => sum + attempt.numberOfTries, 0)

  // Running Average (average tries per attempt)
  const runningAverage = runningTotal / totalAttempts

  // All time-based averages are the same: total tries / number of login attempts
  // This shows the average number of tries per login attempt for the filtered period
  const averageByDay = totalAttempts > 0 ? runningTotal / totalAttempts : 0
  const averageByWeek = totalAttempts > 0 ? runningTotal / totalAttempts : 0
  const averageByMonth = totalAttempts > 0 ? runningTotal / totalAttempts : 0
  const averageByYear = totalAttempts > 0 ? runningTotal / totalAttempts : 0

  return {
    runningTotal: Math.round(runningTotal),
    runningAverage: Math.round(runningAverage * 10) / 10,
    totalAttempts: totalAttempts,
    averageByDay: Math.round(averageByDay * 10) / 10,
    averageByWeek: Math.round(averageByWeek * 10) / 10,
    averageByMonth: Math.round(averageByMonth * 10) / 10,
    averageByYear: Math.round(averageByYear * 10) / 10,
  }
}

// Get random funny message
export function getRandomMessage() {
  const messages = [
    "Maybe next time!",
    "Third time's the charm!",
    "Practice makes perfect!",
    "Getting better!",
    "Keep trying!",
    "Almost there!",
    "You got this!",
    "Nice attempt!",
    "Progress!",
    "One step closer!",
    "Persistence pays off!",
    "Never give up!",
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}
