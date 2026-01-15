import { Café } from '@/data/cafes'

// Helper function to check if a cafe is currently open
export function isCafeOpen(cafe: Café): boolean {
  if (!cafe.openingHours) return true // If no hours specified, assume open

  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const currentTime = now.getHours() * 60 + now.getMinutes() // minutes since midnight

  // Get the hours for current day
  const todayHours = cafe.openingHours[currentDay as keyof typeof cafe.openingHours]

  if (!todayHours || todayHours === 'Closed') return false

  // Parse opening hours (e.g., "7:00 AM - 3:00 PM")
  const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
  const match = todayHours.match(timeRegex)

  if (!match) return true // If we can't parse, assume open

  const [_, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = match

  // Convert to 24-hour format and calculate minutes since midnight
  let openTime = parseInt(openHour) * 60 + parseInt(openMin)
  if (openPeriod.toUpperCase() === 'PM' && parseInt(openHour) !== 12) openTime += 12 * 60
  if (openPeriod.toUpperCase() === 'AM' && parseInt(openHour) === 12) openTime = parseInt(openMin)

  let closeTime = parseInt(closeHour) * 60 + parseInt(closeMin)
  if (closePeriod.toUpperCase() === 'PM' && parseInt(closeHour) !== 12) closeTime += 12 * 60
  if (closePeriod.toUpperCase() === 'AM' && parseInt(closeHour) === 12) closeTime = parseInt(closeMin)

  return currentTime >= openTime && currentTime <= closeTime
}
