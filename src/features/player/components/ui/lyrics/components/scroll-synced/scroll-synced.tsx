import { motion } from 'motion/react'

import type { LyricLine } from '@/utils/parse-lyrics'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import { useSyncedLyrics } from '../../hooks/use-synced-lyrics'

import styles from './scroll-synced.module.css'

interface ScrollSyncedProps {
  lines: LyricLine[]
}

const ScrollSynced = (props: ScrollSyncedProps) => {
  const { lines } = props

  const activeIndex = useSyncedLyrics(lines)
  const seek = usePlayerStore((state) => state.seek)
  const duration = usePlayerStore((state) => state.duration)

  const handleClick = (time: number) => {
    seek((time * 100) / duration)
  }

  return (
    <div className={styles.lyrics}>
      {lines.map((line, index) => {
        const isActive = index === activeIndex

        if (line.text.length === 0) {
          return <br key={line.time} />
        }

        return (
          <motion.button
            key={line.time}
            animate={{
              scale: isActive ? 1.1 : 1,
              color: isActive ? 'var(--player-text-color)' : 'var(--player-text-secondary-color)'
            }}
            className={styles.text}
            onClick={() => handleClick(line.time)}
          >
            {line.text}
          </motion.button>
        )
      })}
    </div>
  )
}

export default ScrollSynced
