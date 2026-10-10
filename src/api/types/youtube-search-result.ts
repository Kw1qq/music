import type { Artists } from './artists'

export interface YoutubeSearchResult {
  artists: Artists
  duration: number | null
  existingTrack: { id: string; status: 'error' | 'processing' | 'ready' } | null
  thumbnail: string | null
  title: string
  url: string
  videoId: string
}
