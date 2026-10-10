import type { PlaylistSummary } from '@/api/types/playlist-summary'
import type { SeacrhType } from '@/routes/library'

export const sortPlaylists = (
  playlists: PlaylistSummary[],
  sort: SeacrhType['sort']
): PlaylistSummary[] => {
  const copy = [...playlists]
  if (!sort) {
    return copy
  }

  switch (sort) {
    case 'recent':
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'ascending':
      return copy.sort((a, b) => a.trackCount - b.trackCount)
    case 'descending':
      return copy.sort((a, b) => b.trackCount - a.trackCount)
    default:
      return copy
  }
}
