import { ActionIcon } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { Shuffle } from 'lucide-react'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import PlayButton from '@/shared/ui/play-button'

import { useAlbumContext } from '../context'

import styles from './actions.module.css'

const Actions = () => {
  const queryClient = useQueryClient()
  const playQueue = usePlayerStore((state) => state.playQueue)
  const playShuffled = usePlayerStore((state) => state.playShuffled)

  const { albumId } = useAlbumContext()

  const getIds = async () => {
    const pl = await queryClient.query(getAlbumQueryOptions(albumId))
    return pl.tracks.map(({ existingTrack }) => existingTrack?.id).filter((t) => t !== undefined)
  }

  const onPlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const ids = await getIds()
    playQueue(ids, 0)
  }

  const onPlayShuffle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const ids = await getIds()
    playShuffled(ids)
  }

  return (
    <div className={styles.actions}>
      <PlayButton onClick={onPlay} />
      <ActionIcon className={styles.action} onClick={onPlayShuffle}>
        <Shuffle size={24} />
      </ActionIcon>
    </div>
  )
}

export default Actions
