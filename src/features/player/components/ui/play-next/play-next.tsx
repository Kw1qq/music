import { ActionIcon } from '@mantine/core'
import { SkipForward } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './play-next.module.css'

const PlayNext = () => {
  const next = usePlayerStore((state) => state.next)
  const hasNext = usePlayerStore((state) => state.hasNext)

  return (
    <ActionIcon classNames={{ root: styles.root }} disabled={!hasNext} onClick={next}>
      <SkipForward size={24} />
    </ActionIcon>
  )
}

export default PlayNext
