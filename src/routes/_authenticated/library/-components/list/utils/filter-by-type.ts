import type { PlaylistSummary } from '@/api/types/playlist-summary'
import type { SeacrhType } from '@/routes/library'

export const filterByType = (
  playlists: PlaylistSummary[],
  filter: SeacrhType['filter']
): PlaylistSummary[] => {
  if (!filter || filter === 'all') return playlists
  return playlists.filter((p) => (filter === 'liked' ? p.isLiked : p.isOwner))
}
