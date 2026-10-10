import type { Track } from '@/api/types/track'
import type { SeacrhType } from '@/routes/likes'

export const sortTracks = (tracks: Track[], sortBy: SeacrhType['sort']) => {
  const sorted = [...tracks]

  switch (sortBy) {
    case 'recent': {
      return sorted
    }

    case 'title': {
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    }

    case 'artist': {
      return sorted.sort((a, b) => {
        const artistA = a.artists[0].name ?? ''
        const artistB = b.artists[0].name ?? ''
        return artistA.localeCompare(artistB)
      })
    }

    default:
      return sorted
  }
}
