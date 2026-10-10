import { ActionIcon } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { Shuffle } from 'lucide-react'

import { getPlaylistQueryOptions } from '@/api/playlists/get-playlist/get-playlist-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import PlayButton from '@/shared/ui/play-button'

import { usePlaylistContext } from '../context'
import Cover from '../cover'
import Menu from '../menu'

import styles from './cover-actions.module.css'

interface CoverActionsProps {
  className?: string
}

const CoverActions = (props: CoverActionsProps) => {
  const { className } = props

  const { id, trackCount } = usePlaylistContext()

  const queryClient = useQueryClient()
  const playQueue = usePlayerStore((state) => state.playQueue)
  const playShuffled = usePlayerStore((state) => state.playShuffled)

  const getIds = async () => {
    const pl = await queryClient.query(getPlaylistQueryOptions(id))

    return pl.tracks.map(({ id }) => id)
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

  const isEmpty = trackCount === 0

  return (
    <div className={clsx(styles.wrapper, className)}>
      <Cover className={styles.cover} />
      <div className={styles.overlay}>
        <Menu />
        <div className={styles.actions}>
          <PlayButton disabled={isEmpty} onClick={onPlay} />
          <ActionIcon className={styles.action} disabled={isEmpty} onClick={onPlayShuffle}>
            <Shuffle size={24} />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}

export default CoverActions
