import { ActionIcon } from '@mantine/core'
import clsx from 'clsx'
import { Shuffle } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './shuffle-button.module.css'

const ShuffleButton = () => {
  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle)

  return (
    <ActionIcon
      classNames={{ root: clsx(styles.root, isShuffling && styles.active) }}
      onClick={toggleShuffle}
    >
      <Shuffle />
    </ActionIcon>
  )
}

export default ShuffleButton
