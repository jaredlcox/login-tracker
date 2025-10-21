// Calculate statistics from attempts data
export function calculateStats(attempts) {
  if (!attempts || attempts.length === 0) {
    return {
      runningTotal: 0,
      runningAverage: 0,
      averageByDay: 0,
      averageByWeek: 0,
      averageByMonth: 0,
    }
  }

  // Running Total
  const runningTotal = attempts.reduce((sum, attempt) => sum + attempt.numberOfTries, 0)

  // Running Average
  const runningAverage = runningTotal / attempts.length

  // Group by date
  const byDate = {}
  attempts.forEach((attempt) => {
    if (!byDate[attempt.date]) {
      byDate[attempt.date] = []
    }
    byDate[attempt.date].push(attempt.numberOfTries)
  })

  // Average by Day (average of daily totals)
  const dailyTotals = Object.values(byDate).map((tries) => tries.reduce((sum, val) => sum + val, 0))
  const averageByDay = dailyTotals.length > 0 ? dailyTotals.reduce((sum, val) => sum + val, 0) / dailyTotals.length : 0

  // Group by week (simplified: group by week number)
  const byWeek = {}
  attempts.forEach((attempt) => {
    const date = new Date(attempt.date)
    const weekNum = getWeekNumber(date)
    const weekKey = `${date.getFullYear()}-W${weekNum}`
    if (!byWeek[weekKey]) {
      byWeek[weekKey] = []
    }
    byWeek[weekKey].push(attempt.numberOfTries)
  })

  const weeklyTotals = Object.values(byWeek).map((tries) => tries.reduce((sum, val) => sum + val, 0))
  const averageByWeek =
    weeklyTotals.length > 0 ? weeklyTotals.reduce((sum, val) => sum + val, 0) / weeklyTotals.length : 0

  // Group by month
  const byMonth = {}
  attempts.forEach((attempt) => {
    const date = new Date(attempt.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    if (!byMonth[monthKey]) {
      byMonth[monthKey] = []
    }
    byMonth[monthKey].push(attempt.numberOfTries)
  })

  const monthlyTotals = Object.values(byMonth).map((tries) => tries.reduce((sum, val) => sum + val, 0))
  const averageByMonth =
    monthlyTotals.length > 0 ? monthlyTotals.reduce((sum, val) => sum + val, 0) / monthlyTotals.length : 0

  return {
    runningTotal: Math.round(runningTotal),
    runningAverage: Math.round(runningAverage * 10) / 10,
    averageByDay: Math.round(averageByDay * 10) / 10,
    averageByWeek: Math.round(averageByWeek * 10) / 10,
    averageByMonth: Math.round(averageByMonth * 10) / 10,
  }
}

// Helper function to get week number
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
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
