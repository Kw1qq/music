import type { HistoryTrack } from '@/api/types/history-track'
import type { Track } from '@/api/types/track'

export const groupTracksByDate = (tracks: HistoryTrack[]) => {
  const groups = new Map<string, Track[]>()

  for (const track of tracks) {
    const dateKey = new Date(track.playedAt).toISOString().split('T')[0]
    if (!groups.has(dateKey)) {
      groups.set(dateKey, [])
    }
    groups.get(dateKey)!.push(track)
  }

  const sortedDates = Array.from(groups.keys()).sort((a, b) => b.localeCompare(a))

  return sortedDates.map((date) => ({
    date,
    tracks: groups.get(date)!
  }))
}
