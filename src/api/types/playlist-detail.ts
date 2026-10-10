import type { Track } from './track'

export interface PlaylistDetail {
  cover: string | null
  createdAt: string
  id: string
  isLiked: boolean
  isOwner: boolean
  isPublic: boolean
  name: string
  tracks: (Track & { position: number })[]
}
