import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'

import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useIsTouch } from '@/hooks/use-is-touch'
import TrackCard from '@/shared/track-card'

interface TrackProps {
  trackId: string
}

const Track = (props: TrackProps) => {
  const { trackId } = props

  const playTrack = usePlayerStore((state) => state.playTrack)
  const getTrackQuery = useQuery(getTrackQueryOptions(trackId))

  const isTouch = useIsTouch()

  const track = getTrackQuery.data
  if (!track || getTrackQuery.isError) {
    return null
  }

  const onPlay = () => {
    playTrack(track.id)
  }

  return (
    <TrackCard.Provider track={track}>
      <TrackCard onPlay={onPlay}>
        <TrackCard.Wrapper>
          <TrackCard.CoverPlayer cover={<TrackCard.Cover />} onPlay={onPlay} />
          <TrackCard.Data>
            <TrackCard.Title />
            <TrackCard.Artist isLink={!isTouch} />
          </TrackCard.Data>
        </TrackCard.Wrapper>
        <TrackCard.Wrapper>
          <TrackCard.Duration />
          <TrackCard.Menu>
            {isTouch && <TrackCard.Menu.GoToArtists />}
            <TrackCard.Menu.Like />
            <TrackCard.Menu.AddToPlaylist />
            <TrackCard.Menu.AddNext />
            <TrackCard.Menu.AddToEnd />
            <TrackCard.Menu.Delete />
          </TrackCard.Menu>
        </TrackCard.Wrapper>
      </TrackCard>
      <TrackCard.AddToPlaylistDrawer />
    </TrackCard.Provider>
  )
}

export default memo(Track)
