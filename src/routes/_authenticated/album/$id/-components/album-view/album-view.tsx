import { ActionIcon, Button } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Play, Shuffle } from 'lucide-react'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import AlbumCard from '@/shared/album-card'
import { pluralizeMinutes } from '@/utils/pluralize-minutes'
import { pluralizeTracks } from '@/utils/pluralize-track'

import { Route } from '../..'

import styles from './album-view.module.css'

const AlbumView = () => {
  const { id } = Route.useParams()

  const getAlbumQuery = useSuspenseQuery(getAlbumQueryOptions(id))

  const album = getAlbumQuery.data
  const existing = album.existingAlbum

  const playQueue = usePlayerStore((state) => state.playQueue)
  const playShuffled = usePlayerStore((state) => state.playShuffled)

  const tracks = album.tracks
  const tracksCount = tracks.length
  const tracksDuration = Math.floor(
    tracks.reduce((acc, track) => (track.duration ?? 0) + acc, 0) / 60
  )

  const isLoading = album.status === 'processing'
  const isReady = album.status === 'ready'

  const ids = album?.tracks
    .map(({ existingTrack }) => existingTrack?.id)
    .filter((t) => t !== undefined)

  const onPlay = () => {
    if (ids) {
      playQueue(ids, 0)
    }
  }
  const onPlayShuffled = () => {
    if (ids) {
      playShuffled(ids)
    }
  }

  return (
    <AlbumCard.Provider album={album}>
      <AlbumCard className={styles.card}>
        <AlbumCard.CoverActions
          classNames={{
            wrapper: styles.coverWrapper,
            cover: styles.cover,
            loader: styles.loader
          }}
          isLoading={isLoading}
        />
        <AlbumCard.Data className={styles.data}>
          <div className={styles.wrapper}>
            <p className={styles.subtitle}>Альбом</p>
            <AlbumCard.Title className={styles.title} />
            <AlbumCard.Artist classNames={{ root: styles.artist }} isLink={true} />
          </div>
          <div className={styles.info}>
            <div>
              <AlbumCard.Year />
              <p className={styles.subtitle}>
                {pluralizeTracks(tracksCount)} ● {pluralizeMinutes(tracksDuration)}
              </p>
            </div>

            <div className={styles.actions}>
              <Button disabled={!isReady} rightSection={<Play size={18} />} onClick={onPlay}>
                воспроизвести
              </Button>
              <ActionIcon disabled={!isReady} onClick={onPlayShuffled}>
                <Shuffle size={24} />
              </ActionIcon>
              <AlbumCard.Menu className={styles.action}>
                {!existing && <AlbumCard.Menu.Download />}
                {!!isReady && (
                  <>
                    <AlbumCard.Menu.Like />
                    <AlbumCard.Menu.AddNext />
                    <AlbumCard.Menu.AddToEnd />
                  </>
                )}
                {existing?.isOwner && <AlbumCard.Menu.Delete />}
              </AlbumCard.Menu>
            </div>
          </div>
        </AlbumCard.Data>
      </AlbumCard>
    </AlbumCard.Provider>
  )
}

export default AlbumView
