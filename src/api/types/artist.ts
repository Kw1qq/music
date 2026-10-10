import type { Album } from './album'
import type { ArtistSummary } from './artist-summary'
import type { ArtistTopSong } from './ArtistTopSong'

export interface Artist {
  albums: Album[]
  artistId: string
  description: string | null
  monthlyListeners: string | null
  name: string
  similarArtists: ArtistSummary[]
  subscriberCount: string | null
  thumbnail: string | null
  topSongs: ArtistTopSong[]
}
