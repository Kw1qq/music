import { motion } from 'motion/react'
import { useRef } from 'react'

import type { LyricLine } from '@/utils/parse-lyrics'

import { useSyncedLyrics } from '../../hooks/use-synced-lyrics'

import styles from './synced.module.css'

interface SyncedProps {
  lines: LyricLine[]
}

const Synced = (props: SyncedProps) => {
  const { lines } = props

  const containerRef = useRef<HTMLDivElement | null>(null)

  const activeIndex = useSyncedLyrics(lines)

  const safeActiveIndex = Math.max(0, activeIndex)

  const currentOffsetY =
    [...(containerRef?.current?.children ?? [])]
      .splice(0, safeActiveIndex)
      .reduce((acc, node) => node.scrollHeight + acc, 0) - 71

  return (
    <motion.div
      ref={containerRef}
      animate={{ y: -currentOffsetY }}
      className={styles.lyrics}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
    >
      {lines.map((line, index) => {
        const isActive = index === activeIndex
        return (
          <motion.div
            key={line.time}
            animate={{
              scale: isActive ? 1.1 : 1,
              color: isActive ? 'var(--player-text-color)' : 'var(--player-text-secondary-color)'
            }}
            className={styles.text}
          >
            {line.text}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default Synced
