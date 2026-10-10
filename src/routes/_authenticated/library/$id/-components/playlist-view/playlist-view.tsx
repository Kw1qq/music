import { ActionIcon, Button, Menu } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ArrowDownUp, Play, Shuffle } from 'lucide-react'

import { getPlaylistQueryOptions } from '@/api/playlists/get-playlist/get-playlist-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useExpanded } from '@/hooks/use-expanded'
import PlaylistCard from '@/shared/playlist-card'
import { pluralizeMinutes } from '@/utils/pluralize-minutes'
import { pluralizeTracks } from '@/utils/pluralize-track'

import { Route } from '../..'
import ReorderTracksDrawer from '../reorder-tracks-drawer'

import styles from './playlist-view.module.css'

const PlaylistView = () => {
  const { isExpanded, open, close } = useExpanded()

  const { id } = Route.useParams()
  const navigate = Route.useNavigate()

  const getPlaylistQuery = useSuspenseQuery(getPlaylistQueryOptions(id))
  const playQueue = usePlayerStore((state) => state.playQueue)
  const playShuffled = usePlayerStore((state) => state.playShuffled)

  const tracks = getPlaylistQuery.data.tracks
  const tracksCount = tracks.length
  const tracksDuration = Math.floor(
    tracks.reduce((acc, track) => (track.duration ?? 0) + acc, 0) / 60
  )

  const ids = tracks.map(({ id }) => id)

  const onPlay = () => {
    playQueue(ids, 0)
  }
  const onPlayShuffled = () => {
    playShuffled(ids)
  }
  const onDelete = () => {
    navigate({
      to: '.'
    })
  }

  return (
    <>
      <PlaylistCard.Context value={{ ...getPlaylistQuery.data, trackCount: tracksCount }}>
        <PlaylistCard className={styles.card}>
          <PlaylistCard.Cover className={styles.cover} />
          <PlaylistCard.Data className={styles.data}>
            <div className={styles.wrapper}>
              <p className={styles.subtitle}>Плейлист</p>
              <PlaylistCard.Title className={styles.title} />
            </div>
            <div className={styles.info}>
              <div>
                <p className={styles.subtitle}>
                  {getPlaylistQuery.data.isPublic ? 'Публичный' : 'Приватный'}
                </p>
                <p className={styles.subtitle}>
                  {pluralizeTracks(tracksCount)} ● {pluralizeMinutes(tracksDuration)}
                </p>
              </div>

              <div className={styles.actions}>
                <Button rightSection={<Play size={18} />} onClick={onPlay}>
                  воспроизвести
                </Button>
                <ActionIcon onClick={onPlayShuffled}>
                  <Shuffle size={24} />
                </ActionIcon>
                <PlaylistCard.Menu className={styles.action} onDelete={onDelete}>
                  {getPlaylistQuery.data.isOwner && (
                    <Menu.Item
                      disabled={ids.length < 2}
                      leftSection={<ArrowDownUp size={24} />}
                      onClick={open}
                    >
                      Изменить порядок
                    </Menu.Item>
                  )}
                </PlaylistCard.Menu>
              </div>
            </div>
          </PlaylistCard.Data>
        </PlaylistCard>
      </PlaylistCard.Context>
      <ReorderTracksDrawer close={close} opened={isExpanded} playlistId={id} tracks={tracks} />
    </>
  )
}

export default PlaylistView
