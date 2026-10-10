import type { Album } from '@/api/types/album'
import type { SeacrhType } from '@/routes/artist/$id/albums'

export const sortAlbums = (albums: Album[], sort: SeacrhType['sort']): Album[] => {
  const copy = [...albums]
  if (!sort) {
    return copy
  }

  switch (sort) {
    case 'default':
      return copy
    case 'release':
      return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return copy
  }
}
