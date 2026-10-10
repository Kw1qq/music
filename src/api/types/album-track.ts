import type { Artists } from './artists'

export interface AlbumTrack {
  artists: Artists
  duration: number | null
  existingTrack: { id: string; status: 'error' | 'processing' | 'ready' } | null
  position: number
  thumbnail: string | null
  title: string
  url: string
  videoId: string
}
