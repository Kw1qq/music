import type { PlaylistDetail } from '@/api/types/playlist-detail'
import type { SeacrhType } from '@/routes/library/$id'

export const sortTracks = (
  tracks: PlaylistDetail['tracks'],
  sortBy: SeacrhType['sort']
): PlaylistDetail['tracks'] => {
  const copy = [...tracks]

  switch (sortBy) {
    case 'default':
      return copy.sort((a, b) => a.position - b.position)

    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))

    case 'artist':
      return copy.sort((a, b) => {
        const artistA = a.artist ?? ''
        const artistB = b.artist ?? ''
        return artistA.localeCompare(artistB, undefined, { sensitivity: 'base' })
      })

    default:
      return copy
  }
}
