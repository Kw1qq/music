import type { Album } from '@/api/types/album'

export const searchAlbumByName = (album: Album[], query: string | undefined): Album[] => {
  if (!query) {
    return album
  }
  const q = query.toLowerCase().trim()
  return album.filter(
    (a) => a.name.toLowerCase().includes(q) || a.artists[0]?.name.toLowerCase().includes(q)
  )
}
