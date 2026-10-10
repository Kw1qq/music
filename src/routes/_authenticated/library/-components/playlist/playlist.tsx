import type { PlaylistSummary } from '@/api/types/playlist-summary'

import PlaylistCard from '@/shared/playlist-card'

interface PlaylistProps {
  playlist: PlaylistSummary
}

const Playlist = (props: PlaylistProps) => {
  const { playlist } = props

  return (
    <>
      <PlaylistCard.Context value={playlist}>
        <PlaylistCard.Link>
          <PlaylistCard>
            <PlaylistCard.CoverActions />
            <PlaylistCard.Data>
              <PlaylistCard.Title />
              <PlaylistCard.TrackCount />
            </PlaylistCard.Data>
          </PlaylistCard>
        </PlaylistCard.Link>
      </PlaylistCard.Context>
    </>
  )
}
export default Playlist
