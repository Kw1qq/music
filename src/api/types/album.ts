import type { AlbumTrack } from './album-track'
import type { Artists } from './artists'

export interface Album {
  albumId: string
  artists: Artists
  cover: string | null
  downloadedCount: number | null
  erroredCount: number | null
  existingAlbum: {
    createdAt: string
    isOwner: boolean
    isLiked: boolean
    sourceUrl: string
  } | null
  name: string
  playlistId: string
  status: 'error' | 'not_imported' | 'processing' | 'ready'
  trackCount: number | null
  tracks: AlbumTrack[]
  year: number | null
}
