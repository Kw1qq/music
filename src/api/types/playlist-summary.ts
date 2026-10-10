export interface PlaylistSummary {
  containsTrack?: boolean
  cover: string | null
  createdAt: string
  id: string
  isLiked: boolean
  isOwner: boolean
  isPublic: boolean
  name: string
  trackCount: number
}
