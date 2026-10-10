import type { PlaylistSummary } from '@/api/types/playlist-summary'

export const searchByName = (
  playlists: PlaylistSummary[],
  query: string | undefined
): PlaylistSummary[] => {
  if (!query) {
    return playlists
  }
  const q = query.toLowerCase().trim()
  return playlists.filter((p) => p.name.toLowerCase().includes(q))
}
