import { useQuery } from '@tanstack/react-query'

import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import TrackCard from '@/shared/track-card'

import styles from './track.module.css'

interface TrackProps {
  trackId: string
}

const Track = (props: TrackProps) => {
  const { trackId } = props

  const getTrackQuery = useQuery(getTrackQueryOptions(trackId))

  const track = getTrackQuery.data
  if (!track || getTrackQuery.isError) {
    return null
  }

  return (
    <TrackCard.Provider track={track}>
      <TrackCard className={styles.card} onPlay={() => {}}>
        <TrackCard.Wrapper>
          <TrackCard.Cover />
          <TrackCard.Data>
            <TrackCard.Title />
            <TrackCard.Artist isLink={false} />
          </TrackCard.Data>
        </TrackCard.Wrapper>
        <TrackCard.Wrapper>
          <TrackCard.Duration />
        </TrackCard.Wrapper>
      </TrackCard>
    </TrackCard.Provider>
  )
}

export default Track
