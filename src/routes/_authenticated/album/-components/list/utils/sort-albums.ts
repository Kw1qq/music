import type { Album } from '@/api/types/album'
import type { SeacrhType } from '@/routes/album'

export const sortAlbums = (albums: Album[], sort: SeacrhType['sort']): Album[] => {
  const copy = [...albums]
  if (!sort) {
    return copy
  }

  switch (sort) {
    case 'recent':
      return copy
    case 'release':
      return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'ascending':
      return copy.sort((a, b) => (a.trackCount ?? 0) - (b.trackCount ?? 0))
    case 'descending':
      return copy.sort((a, b) => (b.trackCount ?? 0) - (a.trackCount ?? 0))
    default:
      return copy
  }
}
