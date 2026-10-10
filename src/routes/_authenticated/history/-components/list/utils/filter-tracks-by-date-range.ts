import type { HistoryTrack } from '@/api/types/history-track'

export const filterTracksByDateRange = (
  tracks: HistoryTrack[],
  date: string | null | undefined
) => {
  if (!date) {
    return tracks
  }

  return tracks.filter((track) => {
    const trackDate = track.playedAt.split('T')[0]
    return trackDate === date
  })
}
