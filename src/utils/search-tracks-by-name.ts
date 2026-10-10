import type { Track } from '@/api/types/track'

export const searchTracksByName = <T extends { title: Track['title']; artists: Track['artists'] }>(
  tracks: T[],
  s: string | undefined
): T[] =>
  tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(s?.toLowerCase() ?? '') ||
      t.artists[0]?.name.toLowerCase().includes(s?.toLowerCase() ?? '')
  )
