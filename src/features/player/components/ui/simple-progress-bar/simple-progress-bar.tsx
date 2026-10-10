import { usePlayerStore } from '@/features/player/core/use-player-store'

import Animate from '../animate'

import styles from './simple-progress-bar.module.css'

const SimpleProgressBar = () => {
  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)

  const progressPercent = (progress * 100) / duration

  return (
    <Animate className={styles.wrapper}>
      <div
        style={{
          background: `linear-gradient(90deg,
              var(--player-background-progress-bar-range-color) ${progressPercent}%,
              transparent ${progressPercent}%)`
        }}
        className={styles.progress}
      />
    </Animate>
  )
}

export default SimpleProgressBar
