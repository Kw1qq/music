import { Menu } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { memo } from 'react'

import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useIsTouch } from '@/hooks/use-is-touch'
import TrackCard from '@/shared/track-card'

import styles from './track.module.css'

interface TrackProps {
  index: number
  queueItemId: string
  trackId: string
  close: () => void
  overlayClose: () => void
}

const Track = (props: TrackProps) => {
  const { trackId, index, queueItemId, close, overlayClose } = props

  const getTrackQuery = useQuery(getTrackQueryOptions(trackId))
  const removeFromQueue = usePlayerStore((state) => state.removeFromQueue)
  const play = usePlayerStore((state) => state.play)
  const track = getTrackQuery.data

  const isTouch = useIsTouch()

  const deleteTrackFromQueue = () => {
    removeFromQueue({ queueItemId })
  }

  if (!track || getTrackQuery.isError) {
    return null
  }

  const onPlay = () => {
    play(index)
  }

  return (
    <TrackCard.Provider track={track}>
      <TrackCard className={styles.card} onPlay={onPlay}>
        <TrackCard.Wrapper>
          <TrackCard.CoverPlayer cover={<TrackCard.Cover />} onPlay={onPlay} />
          <TrackCard.Data>
            <TrackCard.Title className={styles.title} />
            <TrackCard.Artist
              classNames={{ artist: styles.artist, root: styles.rootArtist }}
              isLink={!isTouch}
              onNavigate={() => {
                close()
                overlayClose()
              }}
            />
          </TrackCard.Data>
        </TrackCard.Wrapper>
        <TrackCard.Wrapper>
          <TrackCard.Duration className={styles.duration} />
          <TrackCard.Menu>
            {isTouch && (
              <TrackCard.Menu.GoToArtists
                onClick={() => {
                  close()
                  overlayClose()
                }}
              />
            )}
            <TrackCard.Menu.Like />
            <TrackCard.Menu.AddToPlaylist />
            <TrackCard.Menu.AddNext />
            <TrackCard.Menu.AddToEnd />
            <Menu.Item leftSection={<Trash size={24} />} onClick={deleteTrackFromQueue}>
              Удалить из очереди
            </Menu.Item>
            <TrackCard.Menu.Delete />
          </TrackCard.Menu>
        </TrackCard.Wrapper>
      </TrackCard>

      <TrackCard.AddToPlaylistDrawer />
    </TrackCard.Provider>
  )
}

export default memo(Track)
