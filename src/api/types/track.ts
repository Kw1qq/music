import type { Artists } from './artists'

export interface Track {
  album: string | null
  artists: Artists
  cover: string | null
  createdAt: string
  duration: number | null
  errorMessage: string | null
  format: string | null
  id: string
  likedAt: string | null
  lyricsStatus: 'found' | 'none' | 'not_found' | 'pending'
  playedAt?: string
  source: 'upload' | 'youtube'
  sourceUrl: string | null
  status: 'error' | 'processing' | 'ready'
  title: string
  video: string | null
  videoStatus: 'error' | 'none' | 'processing' | 'ready'
  youtubeId: string | null
}
