import { ActionIcon } from '@mantine/core'
import { SkipBack } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './play-prev.module.css'

const PlayPrev = () => {
  const prev = usePlayerStore((state) => state.prev)
  const hasPrev = usePlayerStore((state) => state.hasPrev)

  return (
    <ActionIcon classNames={{ root: styles.root }} disabled={!hasPrev} onClick={prev}>
      <SkipBack size={24} />
    </ActionIcon>
  )
}

export default PlayPrev
