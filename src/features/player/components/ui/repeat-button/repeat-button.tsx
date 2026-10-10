import { ActionIcon } from '@mantine/core'
import { Repeat, Repeat1 } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './repeat-button.module.css'

const repeatModes = {
  repeat: <Repeat1 size={24} />,
  none: <Repeat className={styles.icon} size={24} />,
  'repeat-queue': <Repeat size={24} />
} as const

const RepeatButton = () => {
  const toggleRepeat = usePlayerStore((state) => state.toggleRepeat)
  const repeatMode = usePlayerStore((state) => state.repeatMode)

  return (
    <ActionIcon classNames={{ root: styles.root }} onClick={toggleRepeat}>
      {repeatModes[repeatMode]}
    </ActionIcon>
  )
}

export default RepeatButton
