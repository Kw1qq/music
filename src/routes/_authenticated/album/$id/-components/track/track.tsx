import { useMutation, useQuery } from '@tanstack/react-query'
import { memo } from 'react'

import type { AlbumTrack } from '@/api/types/album-track'

import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import { postImportTrackMutationOptions } from '@/api/tracks/post-import-track/post-import-track-mutation-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import TrackCard from '@/shared/track-card'

import styles from './track.module.css'

interface TrackProps {
  albumId: string
  queue?: string[]
  track: AlbumTrack
}

const Track = (props: TrackProps) => {
  const { track, queue, albumId } = props

  const { duration, existingTrack, title, url } = track

  const postImportTrackMutation = useMutation(postImportTrackMutationOptions())
  const playQueue = usePlayerStore((state) => state.playQueue)

  const getTrackQuery = useQuery(getTrackQueryOptions(existingTrack?.id ?? null))
  const isLoading = getTrackQuery.data?.status === 'processing'
  const isReady = getTrackQuery.data?.status === 'ready' && existingTrack

  const onPlay = () => {
    if (isReady) {
      if (queue) {
        playQueue(queue, track.position)
      } else {
        playQueue([existingTrack.id], 0)
      }
    }
  }

  const onDownload = () => {
    if (!isLoading) {
      postImportTrackMutation.mutate({ url, albumId })
    }
  }

  return (
    <TrackCard.Provider track={getTrackQuery.data ?? null}>
      <TrackCard className={styles.card} onPlay={onPlay}>
        <TrackCard.Wrapper>
          {isReady ? (
            <TrackCard.CoverPlayer
              classNames={{
                button: styles.button
              }}
              cover={<div className={styles.position}>{track.position + 1}</div>}
              onPlay={onPlay}
            />
          ) : (
            <TrackCard.CoverDownload
              classNames={{
                button: styles.button
              }}
              cover={<div className={styles.position}>{track.position + 1}</div>}
              isLoading={isLoading}
              onDownload={onDownload}
            />
          )}
          <TrackCard.Data>
            <TrackCard.Title>{title}</TrackCard.Title>
          </TrackCard.Data>
        </TrackCard.Wrapper>

        <TrackCard.Wrapper>
          <TrackCard.Duration>{duration ?? 0}</TrackCard.Duration>

          <TrackCard.Menu>
            {!getTrackQuery.data && <TrackCard.Menu.Download albumId={albumId} url={url} />}
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

export default memo(Track)
