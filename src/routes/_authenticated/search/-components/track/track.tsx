import { useMutation, useQuery } from '@tanstack/react-query'

import type { YoutubeSearchResult } from '@/api/types/youtube-search-result'

import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import { postImportTrackMutationOptions } from '@/api/tracks/post-import-track/post-import-track-mutation-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useIsTouch } from '@/hooks/use-is-touch'
import TrackCard from '@/shared/track-card'

import styles from './track.module.css'

interface TrackCardProps {
  track: YoutubeSearchResult
}

const Track = (props: TrackCardProps) => {
  const { track } = props

  const { artists, duration, existingTrack, thumbnail, title, url } = track

  const postImportTrackMutation = useMutation(postImportTrackMutationOptions())
  const playQueue = usePlayerStore((state) => state.playQueue)

  const isTouch = useIsTouch()

  const getTrackQuery = useQuery(getTrackQueryOptions(existingTrack?.id ?? null))
  const isLoading = getTrackQuery.data?.status === 'processing'
  const isReady = getTrackQuery.data?.status === 'ready' && existingTrack

  const onPlay = () => {
    if (isReady && getTrackQuery.data) {
      playQueue([getTrackQuery.data?.id], 0)
    }
  }

  const onDownload = () => {
    if (!isLoading) {
      postImportTrackMutation.mutate({ url })
    }
  }

  return (
    <TrackCard.Provider track={getTrackQuery.data ?? null}>
      <TrackCard className={styles.card} onPlay={onPlay}>
        <TrackCard.Wrapper>
          {isReady ? (
            <TrackCard.CoverPlayer cover={<TrackCard.Cover />} onPlay={onPlay} />
          ) : (
            <TrackCard.CoverDownload
              classNames={{
                button: styles.button
              }}
              cover={<TrackCard.Cover src={thumbnail!} />}
              isLoading={isLoading}
              onDownload={onDownload}
            />
          )}
          <TrackCard.Data>
            <TrackCard.Title>{title}</TrackCard.Title>
            <TrackCard.Artist artists={artists} isLink={!isTouch} />
          </TrackCard.Data>
        </TrackCard.Wrapper>

        <TrackCard.Wrapper>
          <TrackCard.Duration>{duration ?? 0}</TrackCard.Duration>

          <TrackCard.Menu>
            {isTouch && <TrackCard.Menu.GoToArtists artists={artists} />}
            {!getTrackQuery.data && <TrackCard.Menu.Download url={url} />}
            {isReady && (
              <>
                <TrackCard.Menu.Like />
                <TrackCard.Menu.AddToPlaylist />
                <TrackCard.Menu.AddNext />
                <TrackCard.Menu.AddToEnd />
                <TrackCard.Menu.Delete />
              </>
            )}
          </TrackCard.Menu>
        </TrackCard.Wrapper>
      </TrackCard>
      {isReady && !!getTrackQuery.data && <TrackCard.AddToPlaylistDrawer />}
    </TrackCard.Provider>
  )
}

export default Track
